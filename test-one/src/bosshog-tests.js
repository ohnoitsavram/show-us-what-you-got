import bossHog from "./bosshog";
import sinon from "sinon";
import { expect } from "chai";

describe("bosshog", () => {
    it('should return "Boss" when divisible by 3', () => {
        //Assert
        expect(bossHog(3)).to.be.equal("Boss");
    });

    it('should return "Hog" when divisible by 5', () => {
        //Assert
        expect(bossHog(5)).to.be.equal("Hog");
    });

    it('should return "BossHog" when divisible by both 3 and 5', () => {
        //Assert
        expect(bossHog(15)).to.be.equal("BossHog");
    });

    it('should return the input number when neither divisible by 3 nor 5', () => {
        //Assert
        expect(bossHog(1)).to.be.equal(1);
    });
});
