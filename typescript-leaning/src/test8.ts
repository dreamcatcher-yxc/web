console.log('----------------test8----------------');

// 使用方法种类很多，总体而言非常灵活，和 Java 中的枚举用法有很多相似之处。
{
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }

  console.log('Direction: ', Direction);

  enum Direction2 {
    Up = 3,
    Down,
    Left,
    Right
  }

  // 枚举值定义为字符串，则每个枚举项都需要手动指定值
  enum Direction3 {
    Up = "a",
    Down = "b",
    Left = "c",
    Right = 1
  };

  // 异构枚举
  enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
  }

  enum E {
    X, Y, Z
  }

  function f(obj: { X: number }) {
    return obj.X;
  }

  // Works, since 'E' has a property named 'X' which is a number.
  f(E)

  // 更多高级用法，参考: https://www.tslang.cn/docs/handbook/enums.html
}
