function transformer(file, api) {
  const j = api.j;
  const root = j(file.source);

  // 1)
  // sinon.stub().returns(Promise.resolve(data)) => sinon.stub().resolves(data)
  // 2)
  // promise = Promise.resolve(data);
  // sinon.stub().returns(promise) => sinon.stub().resolve(data)
  // 3)
  // sinon.stub().returns(Promise.reject(error)) => sinon.stub().rejects(error)
  // 4)
  // promise = Promise.reject(error);
  // sinon.stub().returns(promise) => sinon.stub().rejects(error)

  root
    .find(j.CallExpression, {
      callee: {
        property: {
          name: 'returns'
        }
      }
    })
    .filter(path => path.node.arguments && path.node.arguments.length)
    .replaceWith(path => {
      const arg = path.node.arguments[0];
      let repl = [arg];
      let meth = 'return';

      if (arg.type === 'Identifier') {
        let found = root.find(j.AssignmentExpression, {
          left: {name: arg.name},
          operator: '=',
          right: {
            type: 'CallExpression',
            callee: {
              object: {
                name: 'Promise'
              }
            }
          }
        });

        if (found.size()) {
          repl = found.get(0).node.right;
          meth = repl.callee.property.name;
          repl = found.get(0).node.right.arguments;
          j(found.get(0).parentPath).remove();
        } else {
          found = root.find(j.VariableDeclarator,
            {
              id: {name: arg.name},
              init: {
                type: 'CallExpression',
                callee: {object: {name: 'Promise'}}
              }
            }
          );
          if (found.size()) {
            repl = found.get(0).node.init;
            meth = repl.callee.property.name;
            repl = repl.arguments;
            j(found.get(0).parentPath).remove();
          }
        }

      } else {
        if (arg.type === 'CallExpression') {
          repl = arg.arguments;
          meth = arg.callee.property.name;
        }
      }

      path.node.callee.property.name = meth + 's';
      return j.callExpression(
          path.node.callee,
          repl
        )
      ;
    });

  // sinon.stub(obj, meth, fn) => sinon.stub(obj, meth).callsFake(fn)
  root
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'sinon'
        },
        property: {
          name: 'stub'
        }
      },
      arguments: {
        length: 3
      }
    })
    .replaceWith(path => {
      return j.memberExpression(
        path.node,
        j.callExpression(
          j.identifier('callsFake'),
          [path.node.arguments.pop()]
        )
      );
    });

  return root.toSource();
}

module.exports = transformer;
