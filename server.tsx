import { App, logger, security, ViewEngine } from './serverDeps.ts';
import routers from './controllers/routers.ts';
import MainComponent from './view/main.tsx';
import DocumentComponent from './view/document.tsx';

const app = new App();
app.use(security());
app.use(logger);

app.use('/api', routers);
app.error('/api', routers);

const ViewRouter = await ViewEngine({
  MainComponent,
  DocumentComponent,
  PageComponentPath: '/view/pages',
});
app.use(ViewRouter);

app.listen({ port: 3000 });
