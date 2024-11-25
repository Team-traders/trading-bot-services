import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import path from 'path';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

(async () => {
  try {
    await loader.load(path.join(__dirname, `application_${env.trim()}.yaml`)
  );
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
})();

export default container;
