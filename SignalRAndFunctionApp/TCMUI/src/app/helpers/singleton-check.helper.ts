export class SingletonCheckHelper {

  private static collection: Set<Function> = new Set();

  static ensureSingleton(target: {}) {

      const type = target.constructor;

      if(!type || type === Object){
          return;
      }

      if(SingletonCheckHelper.collection.has(type)){
          throw `the instance already exists and can not be instantiated: ${type}`;
      }

      SingletonCheckHelper.collection.add(type);
  }
}
