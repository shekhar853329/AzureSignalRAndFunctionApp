export class Task {
  public static delay(ms: number, cancellation?: Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => resolve(null), ms);

      if (cancellation) {
        cancellation.then(() => {
          clearTimeout(timeout);
          reject(new OperationCanceledException());
        });
      }
    });
  }
}
export declare class OperationCanceledException {
  message: string;
}
