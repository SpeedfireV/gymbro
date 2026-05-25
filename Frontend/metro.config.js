const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// 1. Initialize the base Expo configuration
const config = getDefaultConfig(__dirname);

// 2. Extract resolver extensions for mutation
const { assetExts, sourceExts } = config.resolver;

// 3. Append react-native-svg-transformer AST parsing configurations
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  assetExts: assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...sourceExts, "svg"],
};

// 4. Apply NativeWind PostCSS pipeline wrap and export
module.exports = withNativeWind(config, { input: "./global.css" });
