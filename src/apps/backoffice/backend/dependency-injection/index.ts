import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

(async () => {
  try {
    await loader.load(`${__dirname}/application_${env}.yaml`);
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
})();

export default container;
