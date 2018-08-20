/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'chart.bundle.js':'npm:chart.js/dist/Chart.bundle.min.js',
      'chart.js':'npm:chart.js/dist/Chart.min.js',
      'ng2-charts': 'npm:ng2-charts/index.js',
      'jspdf': "npm:jspdf/dist/jspdf.min.js",
      'chartjs-plugin-annotation': "npm:chartjs-plugin-annotation/chartjs-plugin-annotation.min.js",
      'pptxgen': 'npm:pptxgen/dist/pptxgen.js',
      'jsZip' : 'npm:jszip/dist/jszip.min.js',
      'file-system':'npm:file-system/file-system.js',
      'masonry-layout':'npm:masonry-layout/dist/masonry.pkgd.min.js',
      'tether':'npm:tether/dist/js/tether.min.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
