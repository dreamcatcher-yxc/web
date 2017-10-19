const prompt = ([msg = '', num = 20]) => {
  //console.log(msg);
  //console.log(num);
  console.log(`${'*'.repeat(num)}${msg}${'*'.repeat(num)}`);
}

prompt(['正则拓展']);
{
  console.log(new RegExp(/abc/, 'i')); //i
  console.log(new RegExp(/abc/i).flags); // i
  // u 修饰符号
  let s = '𠮷';
  console.log(/^.$/.test(s)); // false, s 的码点大于 0xFFFF
  console.log(/^.$/u.test(s)); // true, 因为开启了 u 模式
}
