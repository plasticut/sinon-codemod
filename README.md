### Migrate test from sinon v1 to sinon v2

- replaces
```
sinon.stub(obj, meth, fn);
```
with
```
sinon.stub(obj, meth).callsFake(fn);
```
- replaces
```
sinon.stub().returns(Promise.reject(error));
```
with
```
sinon.stub().rejects(error);
```
- replaces
```
sinon.stub().returns(Promise.resolve(data));
```
with
```
sinon.stub().resolves(data);
```
- replaces 
```
const err = Promise.reject(new Error);
sinon.stub().returns(err)
``` 
with 
```
sinon.stub().rejects(err);
```
- replaces 
```
let data;
data = Promise.resolve('some data');
sinon.stub().returns(data);
```
with
```
sinon.stub().resolves(data);
```
& etc.

usage:

```shell
$ npm i -g jscodeshift
$ jscodeshift -t sinon-codemod/transform.js <test file path>
$ find <source path> -type f -name \*.spec.js -exec jscodeshift -t ./sinon-codemod/transform.js {} +
```
