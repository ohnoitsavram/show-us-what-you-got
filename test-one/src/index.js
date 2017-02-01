import Logger from './helpers/logger';

let logger = new Logger();

for (var i = 1; i <= 100; i++) {
    if (i % 3 == 0) {
        if (i % 5 == 0) {
            logger.log("BossHog");
        } else {
            logger.log("Boss");
        }
    }
    else if (i % 5 == 0) {
        logger.log("Hog");
    }
    else {
        logger.log(i);
    }
}
