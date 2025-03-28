import { formatcurrency } from "../../scripts/utils/money.js";

describe('test suits: formatcurrency', () => {
    it('Cent to dollars', () => {
        expect(formatcurrency(2095)).toEqual('20.95');
    });
    it('Work with 0', () => {
        expect(formatcurrency(0)).toEqual('0.00');
    });
    it('Round up to the Nearest cent', () => {
        expect(formatcurrency(2000.5)).toEqual('20.01');
    });
});