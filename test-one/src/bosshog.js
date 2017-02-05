function bossHog(i) {
    if (i % 3 == 0) {
        if (i % 5 == 0) {
            return "BossHog";
        } else {
            return "Boss";
        }
    }
    else if (i % 5 == 0) {
        return "Hog";
    }
    else {
        return i;
    }
}

module.exports = bossHog
