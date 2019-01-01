import express from 'express';
import * as http from 'http';
import path from 'path';
import proxy from 'express-proxy-middleware';

class AppServer {
  public app: express.Application;
  public proxy: proxy;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.proxy = proxy;

    this.configureAppServer();
  }

  public startServer(port): void {
    this.app.set('port', port);

    this.server = this.app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  }

  private configureAppServer(): void  {
    this.app.use(express.static(__dirname));
    this.app.use('/api/ext/iana/tlds', this.proxy({
      target: 'http://data.iana.org/TLD',
      secure: false,
      pathRewrite: {
        '^/api/ext/iana/tlds': 'tlds-alpha-by-domain.txt',
      },
      changeOrigin: true,
    }));

    // allow arbitrary outgoing requests
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    this.app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
  }
}

const serverPort = process.env.PORT || '3000';
const server = new AppServer();
server.startServer(serverPort);
