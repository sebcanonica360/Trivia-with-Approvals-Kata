module.exports = function () {
    return {
        files: [
            "src/**/*.ts",
            "tests/**/*.txt"
        ],
        tests: [
            "tests/**/*.ts"
        ],
        env: {
            type: "node",
            runner: "node"
        },
        runMode: "onsave"
    };
};
