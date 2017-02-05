import Logger from './helpers/logger';
import bossHog from './bosshog'

let logger = new Logger();

for (var i = 1; i <= 100; i++) {
    logger.log(bossHog(i));
}
