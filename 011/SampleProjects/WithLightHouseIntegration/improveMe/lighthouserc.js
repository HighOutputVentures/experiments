module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm start",
      url: ["http://localhost:3000/"],
      numberOfRuns: 1,
    },
    upload: {
      target: "filesystem",
      outputDir: "results/",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
