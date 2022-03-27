console.log('----------------test12----------------');

// 接口合并
{
  interface Box {
    height: number;
    width: number;
  }

  interface Box {
    scale: number;
  }

  // 相当于，相同接口会被合并
  // 注意每组接口里的声明顺序保持不变，但各组接口之间的顺序是后来的接口重载出现在靠前位置。
  // 这个规则有一个例外是当出现特殊的函数签名时。 如果签名里有一个参数的类型是 单一的字符串字面量
  //（比如，不是字符串字面量的联合类型），那么它将会被提升到重载列表的最顶端。
  // interface Box {
  //   height: number;
  //   width: number;
  //   scale: number;
  // }

  let box: Box = { height: 5, width: 6, scale: 10 };
}

// 命名空间
// 与接口相似，同名的命名空间也会合并其成员。 命名空间会创建出命名空间和值，我们需要知道这两者都是怎么合并的。
// 对于命名空间的合并，模块导出的同名接口进行合并，构成单一命名空间内含合并后的接口。
// 对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。
namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}

// 等价于
// namespace Animals {
//   export interface Legged { numberOfLegs: number; }

//   export class Zebra { }
//   export class Dog { }
// }

// 除了这些合并外，你还需要了解非导出成员是如何处理的。 非导出成员仅在其原有的（合并前的）命名空间内可见。
// 这就是说合并之后，从其它命名空间合并进来的成员无法访问非导出成员。
namespace Animal2 {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}

namespace Animal2 {
  export function doAnimalsHaveMuscles() {
    // return haveMuscles;  // Error, because haveMuscles is not accessible here
  }
}

// 命名空间与类和函数和枚举类型合并

// 合并命名空间和类
// 下面的方式可以表示内部类
class Album {
  label: Album.AlbumLabel;
}

namespace Album {
  export class AlbumLabel { }
}

// 在JavaScript里，创建一个函数稍后扩展它增加一些属性也是很常见的。 TypeScript使用声明合并来达到这个目的并保证类型安全。
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));

// 使用命名空间扩展枚举
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    }
    else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    }
    else if (colorName == "magenta") {
      return Color.red + Color.blue;
    }
    else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}

console.log('Color', Color);