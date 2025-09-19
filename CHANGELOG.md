## [3.2.10](https://github.com/involvex/create-wizard/compare/v0.0.5...v3.2.10) (2025-09-19)


### Bug Fixes

* apply correct regex escaping for esbuild ([0c26b4a](https://github.com/involvex/create-wizard/commit/0c26b4a051d0e3b56c5553772330c775758ea457))
* **build:** correct syntax error in create-app.js ([1676d71](https://github.com/involvex/create-wizard/commit/1676d71c39703776ab3392822e9628c64c53d75d))
* **build:** ensure tests run against latest build ([aa2bdcf](https://github.com/involvex/create-wizard/commit/aa2bdcf55e8d8385d13c99a8a14083b71e923218))
* **build:** remove typescript annotation from create-test-setup.js ([06aa5fa](https://github.com/involvex/create-wizard/commit/06aa5fae64c87d98089572270f3bcc59754d426e))
* **ci:** add step to create github release ([93a4f82](https://github.com/involvex/create-wizard/commit/93a4f82675d9d04addb8589263919ae062e32954))
* **ci:** automate docs changelog generation ([43a5781](https://github.com/involvex/create-wizard/commit/43a5781596b010e118e98757e85c9a3404ebc3a0))
* **ci:** grant write permissions to release job ([6a7ad3c](https://github.com/involvex/create-wizard/commit/6a7ad3c7132e95df6601bcbe8ee4da0e275d83f3))
* **ci:** update artifact actions to v4 ([e87a401](https://github.com/involvex/create-wizard/commit/e87a401b9e27c846c98178865705c75c41070c3d))
* **ci:** use correct command to run tests ([13a2bb4](https://github.com/involvex/create-wizard/commit/13a2bb42025e5dd89f753751d8557a72dfd9c885))
* **ci:** use npx to run conventional-changelog ([a6e478f](https://github.com/involvex/create-wizard/commit/a6e478f0148c3ebff862b920bb77331a7567e6e8))
* Correct Docusaurus changelog front matter format ([770e0d0](https://github.com/involvex/create-wizard/commit/770e0d0cd87338b44fa72c58159e9f6fbbb373c5))
* Correct Docusaurus changelog front matter format for v3.2.3 and v3.2.5 ([b166cef](https://github.com/involvex/create-wizard/commit/b166cef84747768d12c6798b14b7562efc9792bc))
* Correct Docusaurus changelog front matter format for v3.2.6 ([0e0c953](https://github.com/involvex/create-wizard/commit/0e0c95321d867f0828f0d333bd303b9de37ceafd))
* Correct Docusaurus changelog front matter format for v3.2.7 ([a74e7ff](https://github.com/involvex/create-wizard/commit/a74e7ff7046ade4b194fbeedafc3cf1843d2ef26))
* Correct GitHub Pages workflow for Docusaurus build ([3242895](https://github.com/involvex/create-wizard/commit/32428957444bd8ea114b1e3fd49a08508f3dc359))
* correct regex to resolve esbuild error ([58b5202](https://github.com/involvex/create-wizard/commit/58b52023d74f71265135afee0598c01764e1978c))
* **docs:** resolve author map error and update theme ([91ac8b9](https://github.com/involvex/create-wizard/commit/91ac8b92c7a49830c04e1dbd206cb7c93b0539fe))
* Export test setup functions from create-test-setup.js ([531933e](https://github.com/involvex/create-wizard/commit/531933e7f3cda5637d5f6ee6d831435c8b7d3672))
* Integrate test setup into main create-app flow ([bb728e1](https://github.com/involvex/create-wizard/commit/bb728e1b53d98f7e775d2e751bcce0a4bf35614b))
* Make release script even more robust ([4f2eb6d](https://github.com/involvex/create-wizard/commit/4f2eb6d0cf25c3e0aaf3977cb3675d25049e9b58))
* Make release script more robust ([0a1dd7a](https://github.com/involvex/create-wizard/commit/0a1dd7ae42e8da6ab3f501c08be5fe70057dc042))
* resolve final test failures ([0b6cd79](https://github.com/involvex/create-wizard/commit/0b6cd7977e36b3c5035c749f34ca5fae571ae5ae))
* resolve test failures from incorrect imports and obsolete code ([a3819f0](https://github.com/involvex/create-wizard/commit/a3819f092f33959e1456c1b4810299a6abc5a081))
* restore hacker theme to documentation ([2626354](https://github.com/involvex/create-wizard/commit/26263547ffe211fe3029880037467995923a1c49))
* Run unbundled script to resolve inquirer issues ([30d354c](https://github.com/involvex/create-wizard/commit/30d354cc1b2da0adb14a066f3c0ec61c2140e10a))
* **test:** for the love of all that is holy, remove the last jest reference ([d747169](https://github.com/involvex/create-wizard/commit/d747169bc987b25a7420decf00441442ea986b0e))
* **test:** i have no excuse ([7811753](https://github.com/involvex/create-wizard/commit/7811753044dec1d41cbea8c83ba70e9869c0b900))
* **test:** import afterEach ([0d47acb](https://github.com/involvex/create-wizard/commit/0d47acbef4d234cecae0411ac06f2ba08454a778))
* **test:** import fileURLToPath and exclude RN template tests ([8a01f51](https://github.com/involvex/create-wizard/commit/8a01f51f563ec44d1a873a38fda69ca608518afa))
* **test:** import test ([62028d5](https://github.com/involvex/create-wizard/commit/62028d5f2ca20346530cbc437b75a388bc5370a6))
* **test:** import vitest functions ([cd26bb5](https://github.com/involvex/create-wizard/commit/cd26bb5154c7641f993256a52aa66aeab09df116))
* **test:** provide complete mock for create project test ([b8b6b37](https://github.com/involvex/create-wizard/commit/b8b6b378e41da39cdd76670826586699940b8797))
* **test:** remove final jest reference ([753297d](https://github.com/involvex/create-wizard/commit/753297db0062c883e7ab10c2227f41680342db8e))
* **test:** remove fragile integration test ([885ea3f](https://github.com/involvex/create-wizard/commit/885ea3f9959e28e34344ac4c2a5f3f3c4c36a97a))
* **test:** rewrite test suite correctly ([b8262a9](https://github.com/involvex/create-wizard/commit/b8262a9ad52006ce1f821ef121e9c5b59092bca2))
* **test:** rewrite test suite for the last time ([5b8fa9d](https://github.com/involvex/create-wizard/commit/5b8fa9de4558b044355507ab5b749c969f2c8d3a))
* **test:** rewrite test suite from scratch ([e13bfca](https://github.com/involvex/create-wizard/commit/e13bfcaea27a5020c0d3fcbf3b5895fabc2bdc92))
* **test:** the actual actual final fix ([fff725b](https://github.com/involvex/create-wizard/commit/fff725b6ad5f06739b3ec02e208af40e6aedca80))
* **test:** the actual final fix ([c452c8b](https://github.com/involvex/create-wizard/commit/c452c8bf885a90429424dbe72a4d6dce37748338))
* **test:** the final countdown ([9afb0b3](https://github.com/involvex/create-wizard/commit/9afb0b3ac9b25c03ad18a0fe659341ba7bdb5cf1))
* **test:** the final final final fix ([e7e2a96](https://github.com/involvex/create-wizard/commit/e7e2a963f91b454bfe7e370f419d776da593d01f))
* **test:** this is the one ([e79c601](https://github.com/involvex/create-wizard/commit/e79c6010199f7aeb9596ecfd07c3e10fb14cac1f))
* **test:** use correct template name and local templates ([a49edb0](https://github.com/involvex/create-wizard/commit/a49edb092d12f54bf923374c682a1d0b23ea1082))


### Features

* add .gitignore generator to plugin wizard ([9617b23](https://github.com/involvex/create-wizard/commit/9617b23e548ddb0d089018f9439d5b811705fd64))
* add advanced Discord.js and Gemini CLI command templates ([6e9aa19](https://github.com/involvex/create-wizard/commit/6e9aa1954c54d2b6145172ce2e98d84e881cf421))
* add automated release script and changelog page ([4d5261c](https://github.com/involvex/create-wizard/commit/4d5261c98c019165f49477b530bfb568a06b9f22))
* add electron template and improve docs theme ([3356251](https://github.com/involvex/create-wizard/commit/3356251e825c1c582a01c14ff0aa858bb97ee084))
* Add gemini-ai-starter and gemini-chatbot-express templates ([3a971d2](https://github.com/involvex/create-wizard/commit/3a971d28e773300bff4bf873014961816f565634))
* add interactive plugin configuration wizard ([7f246fc](https://github.com/involvex/create-wizard/commit/7f246fc50ee6d2282612c078ebb4015143c9482e))
* add new templates and license plugin ([e8917d4](https://github.com/involvex/create-wizard/commit/e8917d4e629d3fc75ca8f26dd729cf2b6fa55c46))
* add support message to end of wizard ([19e03ed](https://github.com/involvex/create-wizard/commit/19e03ed15f9ac13fe1314e277c0ddd6bb8f90425))
* add templates for gh-cli-plugin and powershell-module ([1cfa30a](https://github.com/involvex/create-wizard/commit/1cfa30abfbb94a0f12be3170844731fbe24a1066))
* add templates for powertoys run plugins ([bd6d62e](https://github.com/involvex/create-wizard/commit/bd6d62eb92a2dfb88089d9ae4d7fbb7e6c2055a7))
* add templates for vscode extension and docusaurus ([6116ae4](https://github.com/involvex/create-wizard/commit/6116ae40736a89d3c7e948354a266c3e46f25d55))
* centralize templates into a remote library ([9f475cf](https://github.com/involvex/create-wizard/commit/9f475cf21b8587fb932975754b0713857df56422))
* **ci:** automate release process ([dca14a8](https://github.com/involvex/create-wizard/commit/dca14a8c8adf83ce4792bf22dc3011d690699667))
* **cli:** improve UX with spinners and fix npx execution ([ed9d2e3](https://github.com/involvex/create-wizard/commit/ed9d2e319f657bdfd331ec967cdad2578d8c6196))
* create unified and automated release script ([a747940](https://github.com/involvex/create-wizard/commit/a7479408f1263557ed629790d040036da923f220))
* implement advanced CLI options, enhance template creation, and update documentation with UI/UX improvements ([eb9823d](https://github.com/involvex/create-wizard/commit/eb9823db7c47a18b507356e768a5a9edf3806f2e))
* overhaul documentation, improve CLI, and enhance templates ([7ec6004](https://github.com/involvex/create-wizard/commit/7ec6004333118ef9ab33fa0f4c16dace445cfed9))



## [3.2.10](https://github.com/involvex/create-wizard/compare/v0.0.5...v3.2.10) (2025-09-19)


### Bug Fixes

* apply correct regex escaping for esbuild ([0c26b4a](https://github.com/involvex/create-wizard/commit/0c26b4a051d0e3b56c5553772330c775758ea457))
* **build:** correct syntax error in create-app.js ([1676d71](https://github.com/involvex/create-wizard/commit/1676d71c39703776ab3392822e9628c64c53d75d))
* **build:** ensure tests run against latest build ([aa2bdcf](https://github.com/involvex/create-wizard/commit/aa2bdcf55e8d8385d13c99a8a14083b71e923218))
* **build:** remove typescript annotation from create-test-setup.js ([06aa5fa](https://github.com/involvex/create-wizard/commit/06aa5fae64c87d98089572270f3bcc59754d426e))
* **ci:** add step to create github release ([93a4f82](https://github.com/involvex/create-wizard/commit/93a4f82675d9d04addb8589263919ae062e32954))
* **ci:** automate docs changelog generation ([43a5781](https://github.com/involvex/create-wizard/commit/43a5781596b010e118e98757e85c9a3404ebc3a0))
* **ci:** grant write permissions to release job ([6a7ad3c](https://github.com/involvex/create-wizard/commit/6a7ad3c7132e95df6601bcbe8ee4da0e275d83f3))
* **ci:** update artifact actions to v4 ([e87a401](https://github.com/involvex/create-wizard/commit/e87a401b9e27c846c98178865705c75c41070c3d))
* **ci:** use correct command to run tests ([13a2bb4](https://github.com/involvex/create-wizard/commit/13a2bb42025e5dd89f753751d8557a72dfd9c885))
* **ci:** use npx to run conventional-changelog ([a6e478f](https://github.com/involvex/create-wizard/commit/a6e478f0148c3ebff862b920bb77331a7567e6e8))
* Correct Docusaurus changelog front matter format ([770e0d0](https://github.com/involvex/create-wizard/commit/770e0d0cd87338b44fa72c58159e9f6fbbb373c5))
* Correct Docusaurus changelog front matter format for v3.2.3 and v3.2.5 ([b166cef](https://github.com/involvex/create-wizard/commit/b166cef84747768d12c6798b14b7562efc9792bc))
* Correct Docusaurus changelog front matter format for v3.2.6 ([0e0c953](https://github.com/involvex/create-wizard/commit/0e0c95321d867f0828f0d333bd303b9de37ceafd))
* Correct Docusaurus changelog front matter format for v3.2.7 ([a74e7ff](https://github.com/involvex/create-wizard/commit/a74e7ff7046ade4b194fbeedafc3cf1843d2ef26))
* Correct GitHub Pages workflow for Docusaurus build ([3242895](https://github.com/involvex/create-wizard/commit/32428957444bd8ea114b1e3fd49a08508f3dc359))
* correct regex to resolve esbuild error ([58b5202](https://github.com/involvex/create-wizard/commit/58b52023d74f71265135afee0598c01764e1978c))
* **docs:** resolve author map error and update theme ([91ac8b9](https://github.com/involvex/create-wizard/commit/91ac8b92c7a49830c04e1dbd206cb7c93b0539fe))
* Export test setup functions from create-test-setup.js ([531933e](https://github.com/involvex/create-wizard/commit/531933e7f3cda5637d5f6ee6d831435c8b7d3672))
* Integrate test setup into main create-app flow ([bb728e1](https://github.com/involvex/create-wizard/commit/bb728e1b53d98f7e775d2e751bcce0a4bf35614b))
* Make release script more robust ([0a1dd7a](https://github.com/involvex/create-wizard/commit/0a1dd7ae42e8da6ab3f501c08be5fe70057dc042))
* resolve final test failures ([0b6cd79](https://github.com/involvex/create-wizard/commit/0b6cd7977e36b3c5035c749f34ca5fae571ae5ae))
* resolve test failures from incorrect imports and obsolete code ([a3819f0](https://github.com/involvex/create-wizard/commit/a3819f092f33959e1456c1b4810299a6abc5a081))
* restore hacker theme to documentation ([2626354](https://github.com/involvex/create-wizard/commit/26263547ffe211fe3029880037467995923a1c49))
* Run unbundled script to resolve inquirer issues ([30d354c](https://github.com/involvex/create-wizard/commit/30d354cc1b2da0adb14a066f3c0ec61c2140e10a))
* **test:** for the love of all that is holy, remove the last jest reference ([d747169](https://github.com/involvex/create-wizard/commit/d747169bc987b25a7420decf00441442ea986b0e))
* **test:** i have no excuse ([7811753](https://github.com/involvex/create-wizard/commit/7811753044dec1d41cbea8c83ba70e9869c0b900))
* **test:** import afterEach ([0d47acb](https://github.com/involvex/create-wizard/commit/0d47acbef4d234cecae0411ac06f2ba08454a778))
* **test:** import fileURLToPath and exclude RN template tests ([8a01f51](https://github.com/involvex/create-wizard/commit/8a01f51f563ec44d1a873a38fda69ca608518afa))
* **test:** import test ([62028d5](https://github.com/involvex/create-wizard/commit/62028d5f2ca20346530cbc437b75a388bc5370a6))
* **test:** import vitest functions ([cd26bb5](https://github.com/involvex/create-wizard/commit/cd26bb5154c7641f993256a52aa66aeab09df116))
* **test:** provide complete mock for create project test ([b8b6b37](https://github.com/involvex/create-wizard/commit/b8b6b378e41da39cdd76670826586699940b8797))
* **test:** remove final jest reference ([753297d](https://github.com/involvex/create-wizard/commit/753297db0062c883e7ab10c2227f41680342db8e))
* **test:** remove fragile integration test ([885ea3f](https://github.com/involvex/create-wizard/commit/885ea3f9959e28e34344ac4c2a5f3f3c4c36a97a))
* **test:** rewrite test suite correctly ([b8262a9](https://github.com/involvex/create-wizard/commit/b8262a9ad52006ce1f821ef121e9c5b59092bca2))
* **test:** rewrite test suite for the last time ([5b8fa9d](https://github.com/involvex/create-wizard/commit/5b8fa9de4558b044355507ab5b749c969f2c8d3a))
* **test:** rewrite test suite from scratch ([e13bfca](https://github.com/involvex/create-wizard/commit/e13bfcaea27a5020c0d3fcbf3b5895fabc2bdc92))
* **test:** the actual actual final fix ([fff725b](https://github.com/involvex/create-wizard/commit/fff725b6ad5f06739b3ec02e208af40e6aedca80))
* **test:** the actual final fix ([c452c8b](https://github.com/involvex/create-wizard/commit/c452c8bf885a90429424dbe72a4d6dce37748338))
* **test:** the final countdown ([9afb0b3](https://github.com/involvex/create-wizard/commit/9afb0b3ac9b25c03ad18a0fe659341ba7bdb5cf1))
* **test:** the final final final fix ([e7e2a96](https://github.com/involvex/create-wizard/commit/e7e2a963f91b454bfe7e370f419d776da593d01f))
* **test:** this is the one ([e79c601](https://github.com/involvex/create-wizard/commit/e79c6010199f7aeb9596ecfd07c3e10fb14cac1f))
* **test:** use correct template name and local templates ([a49edb0](https://github.com/involvex/create-wizard/commit/a49edb092d12f54bf923374c682a1d0b23ea1082))


### Features

* add .gitignore generator to plugin wizard ([9617b23](https://github.com/involvex/create-wizard/commit/9617b23e548ddb0d089018f9439d5b811705fd64))
* add advanced Discord.js and Gemini CLI command templates ([6e9aa19](https://github.com/involvex/create-wizard/commit/6e9aa1954c54d2b6145172ce2e98d84e881cf421))
* add automated release script and changelog page ([4d5261c](https://github.com/involvex/create-wizard/commit/4d5261c98c019165f49477b530bfb568a06b9f22))
* add electron template and improve docs theme ([3356251](https://github.com/involvex/create-wizard/commit/3356251e825c1c582a01c14ff0aa858bb97ee084))
* Add gemini-ai-starter and gemini-chatbot-express templates ([3a971d2](https://github.com/involvex/create-wizard/commit/3a971d28e773300bff4bf873014961816f565634))
* add interactive plugin configuration wizard ([7f246fc](https://github.com/involvex/create-wizard/commit/7f246fc50ee6d2282612c078ebb4015143c9482e))
* add new templates and license plugin ([e8917d4](https://github.com/involvex/create-wizard/commit/e8917d4e629d3fc75ca8f26dd729cf2b6fa55c46))
* add support message to end of wizard ([19e03ed](https://github.com/involvex/create-wizard/commit/19e03ed15f9ac13fe1314e277c0ddd6bb8f90425))
* add templates for gh-cli-plugin and powershell-module ([1cfa30a](https://github.com/involvex/create-wizard/commit/1cfa30abfbb94a0f12be3170844731fbe24a1066))
* add templates for powertoys run plugins ([bd6d62e](https://github.com/involvex/create-wizard/commit/bd6d62eb92a2dfb88089d9ae4d7fbb7e6c2055a7))
* add templates for vscode extension and docusaurus ([6116ae4](https://github.com/involvex/create-wizard/commit/6116ae40736a89d3c7e948354a266c3e46f25d55))
* centralize templates into a remote library ([9f475cf](https://github.com/involvex/create-wizard/commit/9f475cf21b8587fb932975754b0713857df56422))
* **ci:** automate release process ([dca14a8](https://github.com/involvex/create-wizard/commit/dca14a8c8adf83ce4792bf22dc3011d690699667))
* **cli:** improve UX with spinners and fix npx execution ([ed9d2e3](https://github.com/involvex/create-wizard/commit/ed9d2e319f657bdfd331ec967cdad2578d8c6196))
* create unified and automated release script ([a747940](https://github.com/involvex/create-wizard/commit/a7479408f1263557ed629790d040036da923f220))
* implement advanced CLI options, enhance template creation, and update documentation with UI/UX improvements ([eb9823d](https://github.com/involvex/create-wizard/commit/eb9823db7c47a18b507356e768a5a9edf3806f2e))
* overhaul documentation, improve CLI, and enhance templates ([7ec6004](https://github.com/involvex/create-wizard/commit/7ec6004333118ef9ab33fa0f4c16dace445cfed9))



## [3.2.7](https://github.com/involvex/create-wizard/compare/v0.0.5...v3.2.7) (2025-09-19)


### Bug Fixes

* apply correct regex escaping for esbuild ([0c26b4a](https://github.com/involvex/create-wizard/commit/0c26b4a051d0e3b56c5553772330c775758ea457))
* **build:** correct syntax error in create-app.js ([1676d71](https://github.com/involvex/create-wizard/commit/1676d71c39703776ab3392822e9628c64c53d75d))
* **build:** ensure tests run against latest build ([aa2bdcf](https://github.com/involvex/create-wizard/commit/aa2bdcf55e8d8385d13c99a8a14083b71e923218))
* **build:** remove typescript annotation from create-test-setup.js ([06aa5fa](https://github.com/involvex/create-wizard/commit/06aa5fae64c87d98089572270f3bcc59754d426e))
* **ci:** add step to create github release ([93a4f82](https://github.com/involvex/create-wizard/commit/93a4f82675d9d04addb8589263919ae062e32954))
* **ci:** automate docs changelog generation ([43a5781](https://github.com/involvex/create-wizard/commit/43a5781596b010e118e98757e85c9a3404ebc3a0))
* **ci:** grant write permissions to release job ([6a7ad3c](https://github.com/involvex/create-wizard/commit/6a7ad3c7132e95df6601bcbe8ee4da0e275d83f3))
* **ci:** update artifact actions to v4 ([e87a401](https://github.com/involvex/create-wizard/commit/e87a401b9e27c846c98178865705c75c41070c3d))
* **ci:** use correct command to run tests ([13a2bb4](https://github.com/involvex/create-wizard/commit/13a2bb42025e5dd89f753751d8557a72dfd9c885))
* **ci:** use npx to run conventional-changelog ([a6e478f](https://github.com/involvex/create-wizard/commit/a6e478f0148c3ebff862b920bb77331a7567e6e8))
* Correct Docusaurus changelog front matter format ([770e0d0](https://github.com/involvex/create-wizard/commit/770e0d0cd87338b44fa72c58159e9f6fbbb373c5))
* Correct Docusaurus changelog front matter format for v3.2.3 and v3.2.5 ([b166cef](https://github.com/involvex/create-wizard/commit/b166cef84747768d12c6798b14b7562efc9792bc))
* Correct Docusaurus changelog front matter format for v3.2.6 ([0e0c953](https://github.com/involvex/create-wizard/commit/0e0c95321d867f0828f0d333bd303b9de37ceafd))
* Correct Docusaurus changelog front matter format for v3.2.7 ([a74e7ff](https://github.com/involvex/create-wizard/commit/a74e7ff7046ade4b194fbeedafc3cf1843d2ef26))
* Correct GitHub Pages workflow for Docusaurus build ([3242895](https://github.com/involvex/create-wizard/commit/32428957444bd8ea114b1e3fd49a08508f3dc359))
* correct regex to resolve esbuild error ([58b5202](https://github.com/involvex/create-wizard/commit/58b52023d74f71265135afee0598c01764e1978c))
* **docs:** resolve author map error and update theme ([91ac8b9](https://github.com/involvex/create-wizard/commit/91ac8b92c7a49830c04e1dbd206cb7c93b0539fe))
* resolve final test failures ([0b6cd79](https://github.com/involvex/create-wizard/commit/0b6cd7977e36b3c5035c749f34ca5fae571ae5ae))
* resolve test failures from incorrect imports and obsolete code ([a3819f0](https://github.com/involvex/create-wizard/commit/a3819f092f33959e1456c1b4810299a6abc5a081))
* restore hacker theme to documentation ([2626354](https://github.com/involvex/create-wizard/commit/26263547ffe211fe3029880037467995923a1c49))
* **test:** for the love of all that is holy, remove the last jest reference ([d747169](https://github.com/involvex/create-wizard/commit/d747169bc987b25a7420decf00441442ea986b0e))
* **test:** i have no excuse ([7811753](https://github.com/involvex/create-wizard/commit/7811753044dec1d41cbea8c83ba70e9869c0b900))
* **test:** import afterEach ([0d47acb](https://github.com/involvex/create-wizard/commit/0d47acbef4d234cecae0411ac06f2ba08454a778))
* **test:** import fileURLToPath and exclude RN template tests ([8a01f51](https://github.com/involvex/create-wizard/commit/8a01f51f563ec44d1a873a38fda69ca608518afa))
* **test:** import test ([62028d5](https://github.com/involvex/create-wizard/commit/62028d5f2ca20346530cbc437b75a388bc5370a6))
* **test:** import vitest functions ([cd26bb5](https://github.com/involvex/create-wizard/commit/cd26bb5154c7641f993256a52aa66aeab09df116))
* **test:** provide complete mock for create project test ([b8b6b37](https://github.com/involvex/create-wizard/commit/b8b6b378e41da39cdd76670826586699940b8797))
* **test:** remove final jest reference ([753297d](https://github.com/involvex/create-wizard/commit/753297db0062c883e7ab10c2227f41680342db8e))
* **test:** remove fragile integration test ([885ea3f](https://github.com/involvex/create-wizard/commit/885ea3f9959e28e34344ac4c2a5f3f3c4c36a97a))
* **test:** rewrite test suite correctly ([b8262a9](https://github.com/involvex/create-wizard/commit/b8262a9ad52006ce1f821ef121e9c5b59092bca2))
* **test:** rewrite test suite for the last time ([5b8fa9d](https://github.com/involvex/create-wizard/commit/5b8fa9de4558b044355507ab5b749c969f2c8d3a))
* **test:** rewrite test suite from scratch ([e13bfca](https://github.com/involvex/create-wizard/commit/e13bfcaea27a5020c0d3fcbf3b5895fabc2bdc92))
* **test:** the actual actual final fix ([fff725b](https://github.com/involvex/create-wizard/commit/fff725b6ad5f06739b3ec02e208af40e6aedca80))
* **test:** the actual final fix ([c452c8b](https://github.com/involvex/create-wizard/commit/c452c8bf885a90429424dbe72a4d6dce37748338))
* **test:** the final countdown ([9afb0b3](https://github.com/involvex/create-wizard/commit/9afb0b3ac9b25c03ad18a0fe659341ba7bdb5cf1))
* **test:** the final final final fix ([e7e2a96](https://github.com/involvex/create-wizard/commit/e7e2a963f91b454bfe7e370f419d776da593d01f))
* **test:** this is the one ([e79c601](https://github.com/involvex/create-wizard/commit/e79c6010199f7aeb9596ecfd07c3e10fb14cac1f))
* **test:** use correct template name and local templates ([a49edb0](https://github.com/involvex/create-wizard/commit/a49edb092d12f54bf923374c682a1d0b23ea1082))


### Features

* add .gitignore generator to plugin wizard ([9617b23](https://github.com/involvex/create-wizard/commit/9617b23e548ddb0d089018f9439d5b811705fd64))
* add advanced Discord.js and Gemini CLI command templates ([6e9aa19](https://github.com/involvex/create-wizard/commit/6e9aa1954c54d2b6145172ce2e98d84e881cf421))
* add automated release script and changelog page ([4d5261c](https://github.com/involvex/create-wizard/commit/4d5261c98c019165f49477b530bfb568a06b9f22))
* add electron template and improve docs theme ([3356251](https://github.com/involvex/create-wizard/commit/3356251e825c1c582a01c14ff0aa858bb97ee084))
* Add gemini-ai-starter and gemini-chatbot-express templates ([3a971d2](https://github.com/involvex/create-wizard/commit/3a971d28e773300bff4bf873014961816f565634))
* add interactive plugin configuration wizard ([7f246fc](https://github.com/involvex/create-wizard/commit/7f246fc50ee6d2282612c078ebb4015143c9482e))
* add new templates and license plugin ([e8917d4](https://github.com/involvex/create-wizard/commit/e8917d4e629d3fc75ca8f26dd729cf2b6fa55c46))
* add support message to end of wizard ([19e03ed](https://github.com/involvex/create-wizard/commit/19e03ed15f9ac13fe1314e277c0ddd6bb8f90425))
* add templates for gh-cli-plugin and powershell-module ([1cfa30a](https://github.com/involvex/create-wizard/commit/1cfa30abfbb94a0f12be3170844731fbe24a1066))
* add templates for powertoys run plugins ([bd6d62e](https://github.com/involvex/create-wizard/commit/bd6d62eb92a2dfb88089d9ae4d7fbb7e6c2055a7))
* add templates for vscode extension and docusaurus ([6116ae4](https://github.com/involvex/create-wizard/commit/6116ae40736a89d3c7e948354a266c3e46f25d55))
* centralize templates into a remote library ([9f475cf](https://github.com/involvex/create-wizard/commit/9f475cf21b8587fb932975754b0713857df56422))
* **ci:** automate release process ([dca14a8](https://github.com/involvex/create-wizard/commit/dca14a8c8adf83ce4792bf22dc3011d690699667))
* **cli:** improve UX with spinners and fix npx execution ([ed9d2e3](https://github.com/involvex/create-wizard/commit/ed9d2e319f657bdfd331ec967cdad2578d8c6196))
* create unified and automated release script ([a747940](https://github.com/involvex/create-wizard/commit/a7479408f1263557ed629790d040036da923f220))
* implement advanced CLI options, enhance template creation, and update documentation with UI/UX improvements ([eb9823d](https://github.com/involvex/create-wizard/commit/eb9823db7c47a18b507356e768a5a9edf3806f2e))
* overhaul documentation, improve CLI, and enhance templates ([7ec6004](https://github.com/involvex/create-wizard/commit/7ec6004333118ef9ab33fa0f4c16dace445cfed9))



<!-- @format -->

## 0.0.6 (2025-09-17)

### Features

*   **CLI Enhancements:**
    *   Added explicit dependency versioning for common packages.
    *   Introduced TypeScript support with `tsconfig.json` generation.
    *   Implemented ESLint and Prettier integration with config file generation.
    *   Added Docker support with `Dockerfile` and `.dockerignore` generation.
    *   Included CI/CD workflow generation for GitHub Actions and GitLab CI/CD.
*   **Template Creation Script (`npm run template:create`):**
    *   Enhanced interactive package selection with NPM registry validation and latest version fetching.
    *   Improved script input with interactive name and command prompts.
    *   Added options to auto-generate `tsconfig.json`, `eslint.config.js`, and `.prettierrc` for new templates.
*   **Documentation Overhaul:**
    *   Applied a new "hacker" themed dark color scheme with UI animations.
    *   Created detailed documentation for custom template creation.
    *   Provided comprehensive guides for all existing templates.
    *   Documented theme customization options.

### Bug Fixes

*   Resolved `SyntaxError` in `scripts/create-template.js` due to a missing array bracket.
*   Fixed various ESLint errors and warnings across the codebase, including JSX parsing and unused variable issues.

## 0.0.3 (2025-09-17)

### Features

- Implement comprehensive template system and update documentation ([a2de91b](https://github.com/involvex/create-wizard/commit/a2de91b996fff42e1dee902dd73354632d3fb618))