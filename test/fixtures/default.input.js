sinon.stub({}, 'test', function() {
  console.log('alert');
});

sinon.stub({}, 'test', fn);

sinon.stub({}, 'test', () => {
  console.log('arrow func 1');
});

sinon.stub({}, 'test', done => {
  console.log('arrow func 2');
});

sinon.stub().returns;
sinon.stub().returns();
sinon.stub().returns('literal');
sinon.stub().returns(Promise);
sinon.stub().returns(Promise.resolve());
sinon.stub().returns(Promise.resolve(null));
sinon.stub().returns(Promise.resolve({}));
sinon.stub().returns(Promise.resolve(ident));
sinon.stub().returns(Promise.resolve('literal'));

const data1 = Promise.resolve('data1');
sinon.stub().returns(data1);

let data2;
data2 = Promise.resolve('data2');
sinon.stub().returns(data2);

sinon.stub().returns(Promise.reject());
sinon.stub().returns(Promise.reject(null));
sinon.stub().returns(Promise.reject({}));
sinon.stub().returns(Promise.reject(ident));
sinon.stub().returns(Promise.reject('literal'));

const error1 = Promise.reject(new Error('error1'));
sinon.stub().returns(error1);

let error2;
error2 = Promise.reject(new Error('error2'));
sinon.stub().returns(error2);
