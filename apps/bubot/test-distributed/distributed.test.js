const { expect } = require('chai');
const Joi = require('joi');

const { TemplateNewDataSc } = require('@clark/clark-schemas/template');
const Context = require('@clark/utils/Context');
const knex = require('@clark/utils/knex');

const { http, groupResponses } = require('./utils');

const postResChannelGroupTplSc = Joi.object({
  statuses: Joi.array().items(Joi.number().valid(201)),
  data: Joi.array().items(TemplateNewDataSc),
});
const putResChannelGroupTplSc = Joi.object({
  statuses: Joi.array().items(Joi.number().valid(200)),
  data: Joi.array().items(TemplateNewDataSc),
});

describe('Loadbalancing tests', () => {
  /**
   * @routes /channelGroup/template
   */
  describe('/channelGroup/template', () => {
    /**
     * @route POST /channelGroup/template
     */
    describe('POST x20', () => {
      const testContext = Context.of({});

      it('Creates 20 templates concurrently', () => {
        const {
          cgid,
          ...payload
        } = require('@clark/clark-api/channelGroup/template/$test/dataset/create')({});

        return Promise.all(
          new Array(20).fill().map(() => http.post(`/channelGroup/${cgid}/template`, payload))
        )
          .then(groupResponses)
          .then(testContext.$$mergeAndForward('newData'))
          .then((formatedRes) => {
            const { error } = postResChannelGroupTplSc.validate(formatedRes);
            if (error) throw error;
          });
      });

      after(() => knex('template')
        .whereIn('tid', testContext.newData.data.map(({ tid }) => tid))
        .delete());
    });

    /**
     * @route PUT /channelGroup/template
     */
    describe('PUT  x20', () => {
      const makepayload = require('@clark/clark-api/channelGroup/template/$test/dataset/update');
      const testContext = Context.of({ titles: [] });

      before(() => {
        const { tid, cgid, ...payload } = makepayload({ newData: { tid: 'testid' } });
        return knex('template')
          .insert(payload)
          .returning('*')
          .then(([newData]) => testContext.$$mergeContext({ newData }));
      });

      it('Updatess same template 20 times concurrently', () => Promise.all(
        new Array(20).fill().map((_, i) => {
          const { cgid, tid, ...payload } = makepayload(testContext, `Coucou${i}`);
          // save title for later validation
          testContext.titles.push(payload.title);

          return http.put(`/channelGroup/${cgid}/template/${tid}`, payload);
        })
      )
        .then(groupResponses)
        .then((formatedRes) => {
          const { error } = putResChannelGroupTplSc.validate(formatedRes);
          if (error) throw error;

          const recievedTitles = formatedRes.data.map(({ title }) => title);
          const { titles: savedTitles } = testContext;

          savedTitles.forEach(title => expect(recievedTitles).to.include(title));
        }));

      after(() => knex('template')
        .where('tid', testContext.newData.tid)
        .delete());
    });
  });
});
