import { InverseFuturesClient } from '../../src/inverse-futures-client';
import { getTestProxy } from '../proxy.util';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe('Public Inverse-Futures REST API Endpoints', () => {
  const api = new InverseFuturesClient({}, getTestProxy());

  const symbol = 'BTCUSD';
  const interval = '15';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  describe('Inverse-Futures only endpoints', () => {
    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getPosition()).rejects.toMatchObject(
        notAuthenticatedError(),
      );
      expect(() => api.getApiKeyInfo()).rejects.toMatchObject(
        notAuthenticatedError(),
      );
    });

    it('getOrderBook()', async () => {
      expect(await api.getOrderBook({ symbol })).toMatchObject(
        successResponseList(),
      );
    });

    it('getKline()', async () => {
      expect(await api.getKline({ symbol, interval, from })).toMatchObject(
        successResponseList(),
      );
    });

    it('getTickers()', async () => {
      expect(await api.getTickers()).toMatchObject(successResponseList());
    });

    it('getTrades()', async () => {
      expect(await api.getTrades({ symbol })).toMatchObject(
        successResponseList(),
      );
    });

    it('getSymbols()', async () => {
      expect(await api.getSymbols()).toMatchObject(successResponseList());
    });

    it('getMarkPriceKline()', async () => {
      expect(
        await api.getMarkPriceKline({ symbol, interval, from }),
      ).toMatchObject(successResponseList());
    });

    it('getIndexPriceKline()', async () => {
      expect(
        await api.getIndexPriceKline({ symbol, interval, from }),
      ).toMatchObject(successResponseList());
    });

    it('getPremiumIndexKline()', async () => {
      expect(
        await api.getPremiumIndexKline({ symbol, interval, from }),
      ).toMatchObject(successResponseList());
    });

    it('getLastFundingRate()', async () => {
      expect(await api.getLastFundingRate({ symbol })).toMatchObject(
        successResponseObject(),
      );
    });

    it('getServerTime()', async () => {
      expect(await api.getServerTime()).toMatchObject(successResponseObject());
    });

    it('fetchServertime() returns number', async () => {
      expect(await api.fetchServerTime()).toStrictEqual(expect.any(Number));
    });

    it('getApiAnnouncements()', async () => {
      expect(await api.getApiAnnouncements()).toMatchObject(
        successResponseList(),
      );
    });
  });
});
