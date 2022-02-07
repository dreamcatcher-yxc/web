console.log('----------------test6----------------');

// 基本例子
{
  // 为函数定义类型
  function func1(x: number, y: number): number {
    return x + y;
  }

  // 书写完整函数类型
  let func2: (x: number, y: number) => number =
    function (x: number, y: number): number { return x + y; };

  // 推断类型，和 func2 等价，func3 的类型由 ts 自动推算得到
  let func3 = function (x: number, y: number): number {
    return x + y;
  }
}

// 可选参数
{

  function buildName(firstName: string, lastName?: string) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
  }

  let result1 = buildName("Bob");  // works correctly now
  // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");  // ah, just right
}

// 默认参数
{
  function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }

  let result1 = buildName2("Bob");                  // works correctly now, returns "Bob Smith"
  let result2 = buildName2("Bob", undefined);       // still works, also returns "Bob Smith"
  // let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result4 = buildName2("Bob", "Adams");         // ah, just right
}

// 剩余参数
{
  function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }

  let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
}

// this 参数
{
  function forbidUseThis(this: void) {
    // make sure `this` is unusable in this standalone function
  }

  interface Card {
    suit: string;
    card: number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  }
  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

// this 参数在回调函数里
// 你可以也看到过在回调函数里的this报错，当你将一个函数传递到某个库函数里稍后会被调用时。
// 因为当回调被调用的时候，它们会被当成一个普通函数调用， this将为undefined。 稍做改动，
// 你就可以通过 this参数来避免错误。 首先，库函数的作者要指定 this的类型：
{
  interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
  }
}

// 函数重载
// 由于 js 本身就是弱类型的，ts 重载以如下的方式，定义一个两个重载列表，然后按照 JS 统一实现，
// 视线中判断类型分别处理
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: { suit: string; card: number; }[]): number;
  function pickCard(x: number): { suit: string; card: number; };
  function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}