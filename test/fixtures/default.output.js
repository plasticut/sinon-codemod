sinon.stub({}, 'test').callsFake(function() {
  console.log('alert');
});

sinon.stub({}, 'test').callsFake(fn);

sinon.stub({}, 'test').callsFake(() => {
  console.log('arrow func 1');
});

sinon.stub({}, 'test').callsFake(done => {
  console.log('arrow func 2');
});

sinon.stub().returns;
sinon.stub().returns();
sinon.stub().returns('literal');
sinon.stub().returns(Promise);
sinon.stub().resolves();
sinon.stub().resolves(null);
sinon.stub().resolves({});
sinon.stub().resolves(ident);
sinon.stub().resolves('literal');

sinon.stub().resolves('data1');

let data2;
sinon.stub().resolves('data2');

sinon.stub().rejects();
sinon.stub().rejects(null);
sinon.stub().rejects({});
sinon.stub().rejects(ident);
sinon.stub().rejects('literal');

sinon.stub().rejects(new Error('error1'));

let error2;
sinon.stub().rejects(new Error('error2'));
