export default {
    entry: './dist/index.js',
    dest: './dist/bundles/ng2-nirvana.umd.js',
    format: 'umd',
    // Global namespace.
    moduleName: 'ng.ng2-nirvana',
    // External libraries.
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx',
    },
    onwarn: () => { return }
}