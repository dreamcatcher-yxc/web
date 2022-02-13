import { StringValidator } from './validation';
import { StringValidator as StringValidator3 } from './validation'; // 对导入名字重命名
// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as validator from "./validation";
// 具有副作用的导入（不关心导入结果，导入内容会提供一些全局变量供其他模块使用）---不推荐这么使用
import "./effect.ts";
// 默认导入
import add from './defaultExport';

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

export { ZipCodeValidator as mainValidator }; // 重命名导出名字 ZipCodeValidator 名字为 mainValidator
export { StringValidator as StringValidator2 } from './validation'; // 导出原先的验证器但做了重命名


