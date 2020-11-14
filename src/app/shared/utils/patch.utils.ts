import {BaseOperation, generate, observe} from 'fast-json-patch';
import {ObjectUtils} from './object.utils';

export class PatchUtils {
  public static generatePatchOperations(src: any, dst: any): BaseOperation[]{
    const observer = observe(dst);
    ObjectUtils.copyExistingProperties(src, dst);
    return generate(observer);
  }
}
