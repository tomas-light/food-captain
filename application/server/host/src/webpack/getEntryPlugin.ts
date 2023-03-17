import HtmlWebpackPlugin from 'html-webpack-plugin';
import { paths } from './paths';

export function getEntryPlugin(destinationPath: string, entryName: string) {
  return new HtmlWebpackPlugin({
    template: paths.join(paths.static, 'index-template.html'),
    favicon: paths.join(paths.static, 'img', 'favicon.svg'),
    inject: 'body',
    chunks: [entryName],
    filename: paths.join(destinationPath, `${entryName}.html`),
  });
}
