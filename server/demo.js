const a='a';
const b='b';
// console.log(a,b);

const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //做点事，并测量所需的时间。
  let arr=[1,2,3]
  for(i=0;i<arr.length;i++){
      // console.log(i);
  }
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()