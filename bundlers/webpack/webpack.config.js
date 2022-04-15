export default {
  mode: 'production',
  optimization: {
    usedExports: true,
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  output: {
    chunkLoading: false,
    module: true,
  },
};
