
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GameStats
 * 
 */
export type GameStats = $Result.DefaultSelection<Prisma.$GameStatsPayload>
/**
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GamePlayer
 * 
 */
export type GamePlayer = $Result.DefaultSelection<Prisma.$GamePlayerPayload>
/**
 * Model GameProgress
 * 
 */
export type GameProgress = $Result.DefaultSelection<Prisma.$GameProgressPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GameMode: {
  cards: 'cards',
  classic: 'classic'
};

export type GameMode = (typeof GameMode)[keyof typeof GameMode]


export const GameStatus: {
  waiting: 'waiting',
  active: 'active',
  finished: 'finished',
  cancelled: 'cancelled'
};

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]


export const Difficulty: {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]


export const PlayerRole: {
  host: 'host',
  player: 'player'
};

export type PlayerRole = (typeof PlayerRole)[keyof typeof PlayerRole]


export const DeviceType: {
  desktop: 'desktop',
  mobile: 'mobile',
  tablet: 'tablet'
};

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType]

}

export type GameMode = $Enums.GameMode

export const GameMode: typeof $Enums.GameMode

export type GameStatus = $Enums.GameStatus

export const GameStatus: typeof $Enums.GameStatus

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

export type PlayerRole = $Enums.PlayerRole

export const PlayerRole: typeof $Enums.PlayerRole

export type DeviceType = $Enums.DeviceType

export const DeviceType: typeof $Enums.DeviceType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameStats`: Exposes CRUD operations for the **GameStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameStats
    * const gameStats = await prisma.gameStats.findMany()
    * ```
    */
  get gameStats(): Prisma.GameStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gamePlayer`: Exposes CRUD operations for the **GamePlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GamePlayers
    * const gamePlayers = await prisma.gamePlayer.findMany()
    * ```
    */
  get gamePlayer(): Prisma.GamePlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameProgress`: Exposes CRUD operations for the **GameProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameProgresses
    * const gameProgresses = await prisma.gameProgress.findMany()
    * ```
    */
  get gameProgress(): Prisma.GameProgressDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    GameStats: 'GameStats',
    UserSession: 'UserSession',
    Game: 'Game',
    GamePlayer: 'GamePlayer',
    GameProgress: 'GameProgress'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "gameStats" | "userSession" | "game" | "gamePlayer" | "gameProgress"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GameStats: {
        payload: Prisma.$GameStatsPayload<ExtArgs>
        fields: Prisma.GameStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          findFirst: {
            args: Prisma.GameStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          findMany: {
            args: Prisma.GameStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>[]
          }
          create: {
            args: Prisma.GameStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          createMany: {
            args: Prisma.GameStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>[]
          }
          delete: {
            args: Prisma.GameStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          update: {
            args: Prisma.GameStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          deleteMany: {
            args: Prisma.GameStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>[]
          }
          upsert: {
            args: Prisma.GameStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatsPayload>
          }
          aggregate: {
            args: Prisma.GameStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameStats>
          }
          groupBy: {
            args: Prisma.GameStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameStatsCountArgs<ExtArgs>
            result: $Utils.Optional<GameStatsCountAggregateOutputType> | number
          }
        }
      }
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GamePlayer: {
        payload: Prisma.$GamePlayerPayload<ExtArgs>
        fields: Prisma.GamePlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamePlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamePlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findFirst: {
            args: Prisma.GamePlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamePlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findMany: {
            args: Prisma.GamePlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          create: {
            args: Prisma.GamePlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          createMany: {
            args: Prisma.GamePlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GamePlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          delete: {
            args: Prisma.GamePlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          update: {
            args: Prisma.GamePlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          deleteMany: {
            args: Prisma.GamePlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GamePlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GamePlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          upsert: {
            args: Prisma.GamePlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          aggregate: {
            args: Prisma.GamePlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGamePlayer>
          }
          groupBy: {
            args: Prisma.GamePlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamePlayerCountArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerCountAggregateOutputType> | number
          }
        }
      }
      GameProgress: {
        payload: Prisma.$GameProgressPayload<ExtArgs>
        fields: Prisma.GameProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          findFirst: {
            args: Prisma.GameProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          findMany: {
            args: Prisma.GameProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>[]
          }
          create: {
            args: Prisma.GameProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          createMany: {
            args: Prisma.GameProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>[]
          }
          delete: {
            args: Prisma.GameProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          update: {
            args: Prisma.GameProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          deleteMany: {
            args: Prisma.GameProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>[]
          }
          upsert: {
            args: Prisma.GameProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameProgressPayload>
          }
          aggregate: {
            args: Prisma.GameProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameProgress>
          }
          groupBy: {
            args: Prisma.GameProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameProgressCountArgs<ExtArgs>
            result: $Utils.Optional<GameProgressCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    gameStats?: GameStatsOmit
    userSession?: UserSessionOmit
    game?: GameOmit
    gamePlayer?: GamePlayerOmit
    gameProgress?: GameProgressOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    hostedGames: number
    gameParticipations: number
    gameProgress: number
    wonGames: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    hostedGames?: boolean | UserCountOutputTypeCountHostedGamesArgs
    gameParticipations?: boolean | UserCountOutputTypeCountGameParticipationsArgs
    gameProgress?: boolean | UserCountOutputTypeCountGameProgressArgs
    wonGames?: boolean | UserCountOutputTypeCountWonGamesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHostedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWonGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    players: number
    progress: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | GameCountOutputTypeCountPlayersArgs
    progress?: boolean | GameCountOutputTypeCountProgressArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    detectiveName: string | null
    gameCode: string | null
    registrationDate: Date | null
    lastLogin: Date | null
    isActive: boolean | null
    emailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    detectiveName: string | null
    gameCode: string | null
    registrationDate: Date | null
    lastLogin: Date | null
    isActive: boolean | null
    emailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    detectiveName: number
    gameCode: number
    registrationDate: number
    lastLogin: number
    isActive: number
    emailVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    detectiveName?: true
    gameCode?: true
    registrationDate?: true
    lastLogin?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    detectiveName?: true
    gameCode?: true
    registrationDate?: true
    lastLogin?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    detectiveName?: true
    gameCode?: true
    registrationDate?: true
    lastLogin?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode: string | null
    registrationDate: Date
    lastLogin: Date | null
    isActive: boolean
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    detectiveName?: boolean
    gameCode?: boolean
    registrationDate?: boolean
    lastLogin?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gameStats?: boolean | User$gameStatsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    hostedGames?: boolean | User$hostedGamesArgs<ExtArgs>
    gameParticipations?: boolean | User$gameParticipationsArgs<ExtArgs>
    gameProgress?: boolean | User$gameProgressArgs<ExtArgs>
    wonGames?: boolean | User$wonGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    detectiveName?: boolean
    gameCode?: boolean
    registrationDate?: boolean
    lastLogin?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    detectiveName?: boolean
    gameCode?: boolean
    registrationDate?: boolean
    lastLogin?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    detectiveName?: boolean
    gameCode?: boolean
    registrationDate?: boolean
    lastLogin?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "fullName" | "detectiveName" | "gameCode" | "registrationDate" | "lastLogin" | "isActive" | "emailVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameStats?: boolean | User$gameStatsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    hostedGames?: boolean | User$hostedGamesArgs<ExtArgs>
    gameParticipations?: boolean | User$gameParticipationsArgs<ExtArgs>
    gameProgress?: boolean | User$gameProgressArgs<ExtArgs>
    wonGames?: boolean | User$wonGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      gameStats: Prisma.$GameStatsPayload<ExtArgs> | null
      sessions: Prisma.$UserSessionPayload<ExtArgs>[]
      hostedGames: Prisma.$GamePayload<ExtArgs>[]
      gameParticipations: Prisma.$GamePlayerPayload<ExtArgs>[]
      gameProgress: Prisma.$GameProgressPayload<ExtArgs>[]
      wonGames: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      fullName: string
      detectiveName: string
      gameCode: string | null
      registrationDate: Date
      lastLogin: Date | null
      isActive: boolean
      emailVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gameStats<T extends User$gameStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameStatsArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hostedGames<T extends User$hostedGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$hostedGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameParticipations<T extends User$gameParticipationsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameParticipationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameProgress<T extends User$gameProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$gameProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wonGames<T extends User$wonGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$wonGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly detectiveName: FieldRef<"User", 'String'>
    readonly gameCode: FieldRef<"User", 'String'>
    readonly registrationDate: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.gameStats
   */
  export type User$gameStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    where?: GameStatsWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * User.hostedGames
   */
  export type User$hostedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User.gameParticipations
   */
  export type User$gameParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * User.gameProgress
   */
  export type User$gameProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    where?: GameProgressWhereInput
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    cursor?: GameProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameProgressScalarFieldEnum | GameProgressScalarFieldEnum[]
  }

  /**
   * User.wonGames
   */
  export type User$wonGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GameStats
   */

  export type AggregateGameStats = {
    _count: GameStatsCountAggregateOutputType | null
    _avg: GameStatsAvgAggregateOutputType | null
    _sum: GameStatsSumAggregateOutputType | null
    _min: GameStatsMinAggregateOutputType | null
    _max: GameStatsMaxAggregateOutputType | null
  }

  export type GameStatsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    totalScore: number | null
    cardsCollected: number | null
    bestTimeSeconds: number | null
    comboStreakRecord: number | null
    evidencesFound: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    totalPlaytimeMinutes: number | null
    achievementsUnlocked: number | null
    rankLevel: number | null
    rankPoints: number | null
  }

  export type GameStatsSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    totalScore: number | null
    cardsCollected: number | null
    bestTimeSeconds: number | null
    comboStreakRecord: number | null
    evidencesFound: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    totalPlaytimeMinutes: number | null
    achievementsUnlocked: number | null
    rankLevel: number | null
    rankPoints: number | null
  }

  export type GameStatsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    totalScore: number | null
    cardsCollected: number | null
    bestTimeSeconds: number | null
    favoriteMode: $Enums.GameMode | null
    comboStreakRecord: number | null
    evidencesFound: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    totalPlaytimeMinutes: number | null
    lastGameDate: Date | null
    achievementsUnlocked: number | null
    rankLevel: number | null
    rankPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameStatsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    totalScore: number | null
    cardsCollected: number | null
    bestTimeSeconds: number | null
    favoriteMode: $Enums.GameMode | null
    comboStreakRecord: number | null
    evidencesFound: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    totalPlaytimeMinutes: number | null
    lastGameDate: Date | null
    achievementsUnlocked: number | null
    rankLevel: number | null
    rankPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameStatsCountAggregateOutputType = {
    id: number
    userId: number
    gamesPlayed: number
    gamesWon: number
    gamesLost: number
    totalScore: number
    cardsCollected: number
    bestTimeSeconds: number
    favoriteMode: number
    comboStreakRecord: number
    evidencesFound: number
    suspectsInterrogated: number
    locationsInvestigated: number
    totalPlaytimeMinutes: number
    lastGameDate: number
    achievementsUnlocked: number
    rankLevel: number
    rankPoints: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GameStatsAvgAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    totalScore?: true
    cardsCollected?: true
    bestTimeSeconds?: true
    comboStreakRecord?: true
    evidencesFound?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    totalPlaytimeMinutes?: true
    achievementsUnlocked?: true
    rankLevel?: true
    rankPoints?: true
  }

  export type GameStatsSumAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    totalScore?: true
    cardsCollected?: true
    bestTimeSeconds?: true
    comboStreakRecord?: true
    evidencesFound?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    totalPlaytimeMinutes?: true
    achievementsUnlocked?: true
    rankLevel?: true
    rankPoints?: true
  }

  export type GameStatsMinAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    totalScore?: true
    cardsCollected?: true
    bestTimeSeconds?: true
    favoriteMode?: true
    comboStreakRecord?: true
    evidencesFound?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    totalPlaytimeMinutes?: true
    lastGameDate?: true
    achievementsUnlocked?: true
    rankLevel?: true
    rankPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    totalScore?: true
    cardsCollected?: true
    bestTimeSeconds?: true
    favoriteMode?: true
    comboStreakRecord?: true
    evidencesFound?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    totalPlaytimeMinutes?: true
    lastGameDate?: true
    achievementsUnlocked?: true
    rankLevel?: true
    rankPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameStatsCountAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    totalScore?: true
    cardsCollected?: true
    bestTimeSeconds?: true
    favoriteMode?: true
    comboStreakRecord?: true
    evidencesFound?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    totalPlaytimeMinutes?: true
    lastGameDate?: true
    achievementsUnlocked?: true
    rankLevel?: true
    rankPoints?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GameStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameStats to aggregate.
     */
    where?: GameStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStats to fetch.
     */
    orderBy?: GameStatsOrderByWithRelationInput | GameStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameStats
    **/
    _count?: true | GameStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameStatsMaxAggregateInputType
  }

  export type GetGameStatsAggregateType<T extends GameStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateGameStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameStats[P]>
      : GetScalarType<T[P], AggregateGameStats[P]>
  }




  export type GameStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameStatsWhereInput
    orderBy?: GameStatsOrderByWithAggregationInput | GameStatsOrderByWithAggregationInput[]
    by: GameStatsScalarFieldEnum[] | GameStatsScalarFieldEnum
    having?: GameStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameStatsCountAggregateInputType | true
    _avg?: GameStatsAvgAggregateInputType
    _sum?: GameStatsSumAggregateInputType
    _min?: GameStatsMinAggregateInputType
    _max?: GameStatsMaxAggregateInputType
  }

  export type GameStatsGroupByOutputType = {
    id: number
    userId: number
    gamesPlayed: number
    gamesWon: number
    gamesLost: number
    totalScore: number
    cardsCollected: number
    bestTimeSeconds: number
    favoriteMode: $Enums.GameMode
    comboStreakRecord: number
    evidencesFound: number
    suspectsInterrogated: number
    locationsInvestigated: number
    totalPlaytimeMinutes: number
    lastGameDate: Date | null
    achievementsUnlocked: number
    rankLevel: number
    rankPoints: number
    createdAt: Date
    updatedAt: Date
    _count: GameStatsCountAggregateOutputType | null
    _avg: GameStatsAvgAggregateOutputType | null
    _sum: GameStatsSumAggregateOutputType | null
    _min: GameStatsMinAggregateOutputType | null
    _max: GameStatsMaxAggregateOutputType | null
  }

  type GetGameStatsGroupByPayload<T extends GameStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameStatsGroupByOutputType[P]>
            : GetScalarType<T[P], GameStatsGroupByOutputType[P]>
        }
      >
    >


  export type GameStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    totalScore?: boolean
    cardsCollected?: boolean
    bestTimeSeconds?: boolean
    favoriteMode?: boolean
    comboStreakRecord?: boolean
    evidencesFound?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    totalPlaytimeMinutes?: boolean
    lastGameDate?: boolean
    achievementsUnlocked?: boolean
    rankLevel?: boolean
    rankPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameStats"]>

  export type GameStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    totalScore?: boolean
    cardsCollected?: boolean
    bestTimeSeconds?: boolean
    favoriteMode?: boolean
    comboStreakRecord?: boolean
    evidencesFound?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    totalPlaytimeMinutes?: boolean
    lastGameDate?: boolean
    achievementsUnlocked?: boolean
    rankLevel?: boolean
    rankPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameStats"]>

  export type GameStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    totalScore?: boolean
    cardsCollected?: boolean
    bestTimeSeconds?: boolean
    favoriteMode?: boolean
    comboStreakRecord?: boolean
    evidencesFound?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    totalPlaytimeMinutes?: boolean
    lastGameDate?: boolean
    achievementsUnlocked?: boolean
    rankLevel?: boolean
    rankPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameStats"]>

  export type GameStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    totalScore?: boolean
    cardsCollected?: boolean
    bestTimeSeconds?: boolean
    favoriteMode?: boolean
    comboStreakRecord?: boolean
    evidencesFound?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    totalPlaytimeMinutes?: boolean
    lastGameDate?: boolean
    achievementsUnlocked?: boolean
    rankLevel?: boolean
    rankPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GameStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gamesPlayed" | "gamesWon" | "gamesLost" | "totalScore" | "cardsCollected" | "bestTimeSeconds" | "favoriteMode" | "comboStreakRecord" | "evidencesFound" | "suspectsInterrogated" | "locationsInvestigated" | "totalPlaytimeMinutes" | "lastGameDate" | "achievementsUnlocked" | "rankLevel" | "rankPoints" | "createdAt" | "updatedAt", ExtArgs["result"]["gameStats"]>
  export type GameStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GameStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      gamesPlayed: number
      gamesWon: number
      gamesLost: number
      totalScore: number
      cardsCollected: number
      bestTimeSeconds: number
      favoriteMode: $Enums.GameMode
      comboStreakRecord: number
      evidencesFound: number
      suspectsInterrogated: number
      locationsInvestigated: number
      totalPlaytimeMinutes: number
      lastGameDate: Date | null
      achievementsUnlocked: number
      rankLevel: number
      rankPoints: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gameStats"]>
    composites: {}
  }

  type GameStatsGetPayload<S extends boolean | null | undefined | GameStatsDefaultArgs> = $Result.GetResult<Prisma.$GameStatsPayload, S>

  type GameStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameStatsCountAggregateInputType | true
    }

  export interface GameStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameStats'], meta: { name: 'GameStats' } }
    /**
     * Find zero or one GameStats that matches the filter.
     * @param {GameStatsFindUniqueArgs} args - Arguments to find a GameStats
     * @example
     * // Get one GameStats
     * const gameStats = await prisma.gameStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameStatsFindUniqueArgs>(args: SelectSubset<T, GameStatsFindUniqueArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameStatsFindUniqueOrThrowArgs} args - Arguments to find a GameStats
     * @example
     * // Get one GameStats
     * const gameStats = await prisma.gameStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, GameStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsFindFirstArgs} args - Arguments to find a GameStats
     * @example
     * // Get one GameStats
     * const gameStats = await prisma.gameStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameStatsFindFirstArgs>(args?: SelectSubset<T, GameStatsFindFirstArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsFindFirstOrThrowArgs} args - Arguments to find a GameStats
     * @example
     * // Get one GameStats
     * const gameStats = await prisma.gameStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, GameStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameStats
     * const gameStats = await prisma.gameStats.findMany()
     * 
     * // Get first 10 GameStats
     * const gameStats = await prisma.gameStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameStatsWithIdOnly = await prisma.gameStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameStatsFindManyArgs>(args?: SelectSubset<T, GameStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameStats.
     * @param {GameStatsCreateArgs} args - Arguments to create a GameStats.
     * @example
     * // Create one GameStats
     * const GameStats = await prisma.gameStats.create({
     *   data: {
     *     // ... data to create a GameStats
     *   }
     * })
     * 
     */
    create<T extends GameStatsCreateArgs>(args: SelectSubset<T, GameStatsCreateArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameStats.
     * @param {GameStatsCreateManyArgs} args - Arguments to create many GameStats.
     * @example
     * // Create many GameStats
     * const gameStats = await prisma.gameStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameStatsCreateManyArgs>(args?: SelectSubset<T, GameStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameStats and returns the data saved in the database.
     * @param {GameStatsCreateManyAndReturnArgs} args - Arguments to create many GameStats.
     * @example
     * // Create many GameStats
     * const gameStats = await prisma.gameStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameStats and only return the `id`
     * const gameStatsWithIdOnly = await prisma.gameStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, GameStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameStats.
     * @param {GameStatsDeleteArgs} args - Arguments to delete one GameStats.
     * @example
     * // Delete one GameStats
     * const GameStats = await prisma.gameStats.delete({
     *   where: {
     *     // ... filter to delete one GameStats
     *   }
     * })
     * 
     */
    delete<T extends GameStatsDeleteArgs>(args: SelectSubset<T, GameStatsDeleteArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameStats.
     * @param {GameStatsUpdateArgs} args - Arguments to update one GameStats.
     * @example
     * // Update one GameStats
     * const gameStats = await prisma.gameStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameStatsUpdateArgs>(args: SelectSubset<T, GameStatsUpdateArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameStats.
     * @param {GameStatsDeleteManyArgs} args - Arguments to filter GameStats to delete.
     * @example
     * // Delete a few GameStats
     * const { count } = await prisma.gameStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameStatsDeleteManyArgs>(args?: SelectSubset<T, GameStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameStats
     * const gameStats = await prisma.gameStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameStatsUpdateManyArgs>(args: SelectSubset<T, GameStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameStats and returns the data updated in the database.
     * @param {GameStatsUpdateManyAndReturnArgs} args - Arguments to update many GameStats.
     * @example
     * // Update many GameStats
     * const gameStats = await prisma.gameStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameStats and only return the `id`
     * const gameStatsWithIdOnly = await prisma.gameStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, GameStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameStats.
     * @param {GameStatsUpsertArgs} args - Arguments to update or create a GameStats.
     * @example
     * // Update or create a GameStats
     * const gameStats = await prisma.gameStats.upsert({
     *   create: {
     *     // ... data to create a GameStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameStats we want to update
     *   }
     * })
     */
    upsert<T extends GameStatsUpsertArgs>(args: SelectSubset<T, GameStatsUpsertArgs<ExtArgs>>): Prisma__GameStatsClient<$Result.GetResult<Prisma.$GameStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsCountArgs} args - Arguments to filter GameStats to count.
     * @example
     * // Count the number of GameStats
     * const count = await prisma.gameStats.count({
     *   where: {
     *     // ... the filter for the GameStats we want to count
     *   }
     * })
    **/
    count<T extends GameStatsCountArgs>(
      args?: Subset<T, GameStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameStatsAggregateArgs>(args: Subset<T, GameStatsAggregateArgs>): Prisma.PrismaPromise<GetGameStatsAggregateType<T>>

    /**
     * Group by GameStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameStatsGroupByArgs['orderBy'] }
        : { orderBy?: GameStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameStats model
   */
  readonly fields: GameStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameStats model
   */
  interface GameStatsFieldRefs {
    readonly id: FieldRef<"GameStats", 'Int'>
    readonly userId: FieldRef<"GameStats", 'Int'>
    readonly gamesPlayed: FieldRef<"GameStats", 'Int'>
    readonly gamesWon: FieldRef<"GameStats", 'Int'>
    readonly gamesLost: FieldRef<"GameStats", 'Int'>
    readonly totalScore: FieldRef<"GameStats", 'Int'>
    readonly cardsCollected: FieldRef<"GameStats", 'Int'>
    readonly bestTimeSeconds: FieldRef<"GameStats", 'Int'>
    readonly favoriteMode: FieldRef<"GameStats", 'GameMode'>
    readonly comboStreakRecord: FieldRef<"GameStats", 'Int'>
    readonly evidencesFound: FieldRef<"GameStats", 'Int'>
    readonly suspectsInterrogated: FieldRef<"GameStats", 'Int'>
    readonly locationsInvestigated: FieldRef<"GameStats", 'Int'>
    readonly totalPlaytimeMinutes: FieldRef<"GameStats", 'Int'>
    readonly lastGameDate: FieldRef<"GameStats", 'DateTime'>
    readonly achievementsUnlocked: FieldRef<"GameStats", 'Int'>
    readonly rankLevel: FieldRef<"GameStats", 'Int'>
    readonly rankPoints: FieldRef<"GameStats", 'Int'>
    readonly createdAt: FieldRef<"GameStats", 'DateTime'>
    readonly updatedAt: FieldRef<"GameStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameStats findUnique
   */
  export type GameStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter, which GameStats to fetch.
     */
    where: GameStatsWhereUniqueInput
  }

  /**
   * GameStats findUniqueOrThrow
   */
  export type GameStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter, which GameStats to fetch.
     */
    where: GameStatsWhereUniqueInput
  }

  /**
   * GameStats findFirst
   */
  export type GameStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter, which GameStats to fetch.
     */
    where?: GameStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStats to fetch.
     */
    orderBy?: GameStatsOrderByWithRelationInput | GameStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStats.
     */
    cursor?: GameStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStats.
     */
    distinct?: GameStatsScalarFieldEnum | GameStatsScalarFieldEnum[]
  }

  /**
   * GameStats findFirstOrThrow
   */
  export type GameStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter, which GameStats to fetch.
     */
    where?: GameStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStats to fetch.
     */
    orderBy?: GameStatsOrderByWithRelationInput | GameStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStats.
     */
    cursor?: GameStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStats.
     */
    distinct?: GameStatsScalarFieldEnum | GameStatsScalarFieldEnum[]
  }

  /**
   * GameStats findMany
   */
  export type GameStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter, which GameStats to fetch.
     */
    where?: GameStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStats to fetch.
     */
    orderBy?: GameStatsOrderByWithRelationInput | GameStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameStats.
     */
    cursor?: GameStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStats.
     */
    skip?: number
    distinct?: GameStatsScalarFieldEnum | GameStatsScalarFieldEnum[]
  }

  /**
   * GameStats create
   */
  export type GameStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a GameStats.
     */
    data: XOR<GameStatsCreateInput, GameStatsUncheckedCreateInput>
  }

  /**
   * GameStats createMany
   */
  export type GameStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameStats.
     */
    data: GameStatsCreateManyInput | GameStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameStats createManyAndReturn
   */
  export type GameStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * The data used to create many GameStats.
     */
    data: GameStatsCreateManyInput | GameStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameStats update
   */
  export type GameStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a GameStats.
     */
    data: XOR<GameStatsUpdateInput, GameStatsUncheckedUpdateInput>
    /**
     * Choose, which GameStats to update.
     */
    where: GameStatsWhereUniqueInput
  }

  /**
   * GameStats updateMany
   */
  export type GameStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameStats.
     */
    data: XOR<GameStatsUpdateManyMutationInput, GameStatsUncheckedUpdateManyInput>
    /**
     * Filter which GameStats to update
     */
    where?: GameStatsWhereInput
    /**
     * Limit how many GameStats to update.
     */
    limit?: number
  }

  /**
   * GameStats updateManyAndReturn
   */
  export type GameStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * The data used to update GameStats.
     */
    data: XOR<GameStatsUpdateManyMutationInput, GameStatsUncheckedUpdateManyInput>
    /**
     * Filter which GameStats to update
     */
    where?: GameStatsWhereInput
    /**
     * Limit how many GameStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameStats upsert
   */
  export type GameStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the GameStats to update in case it exists.
     */
    where: GameStatsWhereUniqueInput
    /**
     * In case the GameStats found by the `where` argument doesn't exist, create a new GameStats with this data.
     */
    create: XOR<GameStatsCreateInput, GameStatsUncheckedCreateInput>
    /**
     * In case the GameStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameStatsUpdateInput, GameStatsUncheckedUpdateInput>
  }

  /**
   * GameStats delete
   */
  export type GameStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
    /**
     * Filter which GameStats to delete.
     */
    where: GameStatsWhereUniqueInput
  }

  /**
   * GameStats deleteMany
   */
  export type GameStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameStats to delete
     */
    where?: GameStatsWhereInput
    /**
     * Limit how many GameStats to delete.
     */
    limit?: number
  }

  /**
   * GameStats without action
   */
  export type GameStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStats
     */
    select?: GameStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameStats
     */
    omit?: GameStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStatsInclude<ExtArgs> | null
  }


  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _avg: UserSessionAvgAggregateOutputType | null
    _sum: UserSessionSumAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserSessionSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: number | null
    userId: number | null
    sessionToken: string | null
    ipAddress: string | null
    userAgent: string | null
    deviceType: $Enums.DeviceType | null
    browser: string | null
    operatingSystem: string | null
    isActive: boolean | null
    loginTime: Date | null
    lastActivity: Date | null
    logoutTime: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    sessionToken: string | null
    ipAddress: string | null
    userAgent: string | null
    deviceType: $Enums.DeviceType | null
    browser: string | null
    operatingSystem: string | null
    isActive: boolean | null
    loginTime: Date | null
    lastActivity: Date | null
    logoutTime: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    userId: number
    sessionToken: number
    ipAddress: number
    userAgent: number
    deviceType: number
    browser: number
    operatingSystem: number
    isActive: number
    loginTime: number
    lastActivity: number
    logoutTime: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSessionAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserSessionSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserSessionMinAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    browser?: true
    operatingSystem?: true
    isActive?: true
    loginTime?: true
    lastActivity?: true
    logoutTime?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    browser?: true
    operatingSystem?: true
    isActive?: true
    loginTime?: true
    lastActivity?: true
    logoutTime?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    userId?: true
    sessionToken?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    browser?: true
    operatingSystem?: true
    isActive?: true
    loginTime?: true
    lastActivity?: true
    logoutTime?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _avg?: UserSessionAvgAggregateInputType
    _sum?: UserSessionSumAggregateInputType
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: number
    userId: number
    sessionToken: string
    ipAddress: string | null
    userAgent: string | null
    deviceType: $Enums.DeviceType | null
    browser: string | null
    operatingSystem: string | null
    isActive: boolean
    loginTime: Date
    lastActivity: Date | null
    logoutTime: Date | null
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: UserSessionCountAggregateOutputType | null
    _avg: UserSessionAvgAggregateOutputType | null
    _sum: UserSessionSumAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    browser?: boolean
    operatingSystem?: boolean
    isActive?: boolean
    loginTime?: boolean
    lastActivity?: boolean
    logoutTime?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    browser?: boolean
    operatingSystem?: boolean
    isActive?: boolean
    loginTime?: boolean
    lastActivity?: boolean
    logoutTime?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    browser?: boolean
    operatingSystem?: boolean
    isActive?: boolean
    loginTime?: boolean
    lastActivity?: boolean
    logoutTime?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionToken?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    browser?: boolean
    operatingSystem?: boolean
    isActive?: boolean
    loginTime?: boolean
    lastActivity?: boolean
    logoutTime?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sessionToken" | "ipAddress" | "userAgent" | "deviceType" | "browser" | "operatingSystem" | "isActive" | "loginTime" | "lastActivity" | "logoutTime" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      sessionToken: string
      ipAddress: string | null
      userAgent: string | null
      deviceType: $Enums.DeviceType | null
      browser: string | null
      operatingSystem: string | null
      isActive: boolean
      loginTime: Date
      lastActivity: Date | null
      logoutTime: Date | null
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions and returns the data updated in the database.
     * @param {UserSessionUpdateManyAndReturnArgs} args - Arguments to update many UserSessions.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'Int'>
    readonly userId: FieldRef<"UserSession", 'Int'>
    readonly sessionToken: FieldRef<"UserSession", 'String'>
    readonly ipAddress: FieldRef<"UserSession", 'String'>
    readonly userAgent: FieldRef<"UserSession", 'String'>
    readonly deviceType: FieldRef<"UserSession", 'DeviceType'>
    readonly browser: FieldRef<"UserSession", 'String'>
    readonly operatingSystem: FieldRef<"UserSession", 'String'>
    readonly isActive: FieldRef<"UserSession", 'Boolean'>
    readonly loginTime: FieldRef<"UserSession", 'DateTime'>
    readonly lastActivity: FieldRef<"UserSession", 'DateTime'>
    readonly logoutTime: FieldRef<"UserSession", 'DateTime'>
    readonly expiresAt: FieldRef<"UserSession", 'DateTime'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession updateManyAndReturn
   */
  export type UserSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    hostUserId: number | null
    maxPlayers: number | null
    currentPlayers: number | null
    timeLimitMinutes: number | null
    winnerUserId: number | null
    totalScore: number | null
    gameDurationMinutes: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    hostUserId: number | null
    maxPlayers: number | null
    currentPlayers: number | null
    timeLimitMinutes: number | null
    winnerUserId: number | null
    totalScore: number | null
    gameDurationMinutes: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    gameCode: string | null
    hostUserId: number | null
    gameMode: $Enums.GameMode | null
    maxPlayers: number | null
    currentPlayers: number | null
    status: $Enums.GameStatus | null
    difficulty: $Enums.Difficulty | null
    timeLimitMinutes: number | null
    createdAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    winnerUserId: number | null
    totalScore: number | null
    gameDurationMinutes: number | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    gameCode: string | null
    hostUserId: number | null
    gameMode: $Enums.GameMode | null
    maxPlayers: number | null
    currentPlayers: number | null
    status: $Enums.GameStatus | null
    difficulty: $Enums.Difficulty | null
    timeLimitMinutes: number | null
    createdAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    winnerUserId: number | null
    totalScore: number | null
    gameDurationMinutes: number | null
    isActive: boolean | null
    updatedAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    gameCode: number
    hostUserId: number
    gameMode: number
    maxPlayers: number
    currentPlayers: number
    status: number
    difficulty: number
    timeLimitMinutes: number
    createdAt: number
    startedAt: number
    finishedAt: number
    winnerUserId: number
    totalScore: number
    gameDurationMinutes: number
    isActive: number
    settingsJson: number
    updatedAt: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    hostUserId?: true
    maxPlayers?: true
    currentPlayers?: true
    timeLimitMinutes?: true
    winnerUserId?: true
    totalScore?: true
    gameDurationMinutes?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    hostUserId?: true
    maxPlayers?: true
    currentPlayers?: true
    timeLimitMinutes?: true
    winnerUserId?: true
    totalScore?: true
    gameDurationMinutes?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    gameCode?: true
    hostUserId?: true
    gameMode?: true
    maxPlayers?: true
    currentPlayers?: true
    status?: true
    difficulty?: true
    timeLimitMinutes?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
    winnerUserId?: true
    totalScore?: true
    gameDurationMinutes?: true
    isActive?: true
    updatedAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    gameCode?: true
    hostUserId?: true
    gameMode?: true
    maxPlayers?: true
    currentPlayers?: true
    status?: true
    difficulty?: true
    timeLimitMinutes?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
    winnerUserId?: true
    totalScore?: true
    gameDurationMinutes?: true
    isActive?: true
    updatedAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    gameCode?: true
    hostUserId?: true
    gameMode?: true
    maxPlayers?: true
    currentPlayers?: true
    status?: true
    difficulty?: true
    timeLimitMinutes?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
    winnerUserId?: true
    totalScore?: true
    gameDurationMinutes?: true
    isActive?: true
    settingsJson?: true
    updatedAt?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers: number
    currentPlayers: number
    status: $Enums.GameStatus
    difficulty: $Enums.Difficulty
    timeLimitMinutes: number
    createdAt: Date
    startedAt: Date | null
    finishedAt: Date | null
    winnerUserId: number | null
    totalScore: number | null
    gameDurationMinutes: number | null
    isActive: boolean
    settingsJson: JsonValue | null
    updatedAt: Date
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameCode?: boolean
    hostUserId?: boolean
    gameMode?: boolean
    maxPlayers?: boolean
    currentPlayers?: boolean
    status?: boolean
    difficulty?: boolean
    timeLimitMinutes?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    winnerUserId?: boolean
    totalScore?: boolean
    gameDurationMinutes?: boolean
    isActive?: boolean
    settingsJson?: boolean
    updatedAt?: boolean
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
    players?: boolean | Game$playersArgs<ExtArgs>
    progress?: boolean | Game$progressArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameCode?: boolean
    hostUserId?: boolean
    gameMode?: boolean
    maxPlayers?: boolean
    currentPlayers?: boolean
    status?: boolean
    difficulty?: boolean
    timeLimitMinutes?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    winnerUserId?: boolean
    totalScore?: boolean
    gameDurationMinutes?: boolean
    isActive?: boolean
    settingsJson?: boolean
    updatedAt?: boolean
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameCode?: boolean
    hostUserId?: boolean
    gameMode?: boolean
    maxPlayers?: boolean
    currentPlayers?: boolean
    status?: boolean
    difficulty?: boolean
    timeLimitMinutes?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    winnerUserId?: boolean
    totalScore?: boolean
    gameDurationMinutes?: boolean
    isActive?: boolean
    settingsJson?: boolean
    updatedAt?: boolean
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    gameCode?: boolean
    hostUserId?: boolean
    gameMode?: boolean
    maxPlayers?: boolean
    currentPlayers?: boolean
    status?: boolean
    difficulty?: boolean
    timeLimitMinutes?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    winnerUserId?: boolean
    totalScore?: boolean
    gameDurationMinutes?: boolean
    isActive?: boolean
    settingsJson?: boolean
    updatedAt?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameCode" | "hostUserId" | "gameMode" | "maxPlayers" | "currentPlayers" | "status" | "difficulty" | "timeLimitMinutes" | "createdAt" | "startedAt" | "finishedAt" | "winnerUserId" | "totalScore" | "gameDurationMinutes" | "isActive" | "settingsJson" | "updatedAt", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
    players?: boolean | Game$playersArgs<ExtArgs>
    progress?: boolean | Game$progressArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Game$winnerArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      host: Prisma.$UserPayload<ExtArgs>
      winner: Prisma.$UserPayload<ExtArgs> | null
      players: Prisma.$GamePlayerPayload<ExtArgs>[]
      progress: Prisma.$GameProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameCode: string
      hostUserId: number
      gameMode: $Enums.GameMode
      maxPlayers: number
      currentPlayers: number
      status: $Enums.GameStatus
      difficulty: $Enums.Difficulty
      timeLimitMinutes: number
      createdAt: Date
      startedAt: Date | null
      finishedAt: Date | null
      winnerUserId: number | null
      totalScore: number | null
      gameDurationMinutes: number | null
      isActive: boolean
      settingsJson: Prisma.JsonValue | null
      updatedAt: Date
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    winner<T extends Game$winnerArgs<ExtArgs> = {}>(args?: Subset<T, Game$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    players<T extends Game$playersArgs<ExtArgs> = {}>(args?: Subset<T, Game$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progress<T extends Game$progressArgs<ExtArgs> = {}>(args?: Subset<T, Game$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly gameCode: FieldRef<"Game", 'String'>
    readonly hostUserId: FieldRef<"Game", 'Int'>
    readonly gameMode: FieldRef<"Game", 'GameMode'>
    readonly maxPlayers: FieldRef<"Game", 'Int'>
    readonly currentPlayers: FieldRef<"Game", 'Int'>
    readonly status: FieldRef<"Game", 'GameStatus'>
    readonly difficulty: FieldRef<"Game", 'Difficulty'>
    readonly timeLimitMinutes: FieldRef<"Game", 'Int'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly startedAt: FieldRef<"Game", 'DateTime'>
    readonly finishedAt: FieldRef<"Game", 'DateTime'>
    readonly winnerUserId: FieldRef<"Game", 'Int'>
    readonly totalScore: FieldRef<"Game", 'Int'>
    readonly gameDurationMinutes: FieldRef<"Game", 'Int'>
    readonly isActive: FieldRef<"Game", 'Boolean'>
    readonly settingsJson: FieldRef<"Game", 'Json'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.winner
   */
  export type Game$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Game.players
   */
  export type Game$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * Game.progress
   */
  export type Game$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    where?: GameProgressWhereInput
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    cursor?: GameProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameProgressScalarFieldEnum | GameProgressScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model GamePlayer
   */

  export type AggregateGamePlayer = {
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  export type GamePlayerAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    finalScore: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    evidencesCollected: number | null
    timeBonus: number | null
    positionFinished: number | null
    achievementsEarned: number | null
  }

  export type GamePlayerSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    finalScore: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    evidencesCollected: number | null
    timeBonus: number | null
    positionFinished: number | null
    achievementsEarned: number | null
  }

  export type GamePlayerMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    detectiveName: string | null
    role: $Enums.PlayerRole | null
    isReady: boolean | null
    joinTime: Date | null
    leaveTime: Date | null
    finalScore: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    evidencesCollected: number | null
    timeBonus: number | null
    isActive: boolean | null
    positionFinished: number | null
    achievementsEarned: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePlayerMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    detectiveName: string | null
    role: $Enums.PlayerRole | null
    isReady: boolean | null
    joinTime: Date | null
    leaveTime: Date | null
    finalScore: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    evidencesCollected: number | null
    timeBonus: number | null
    isActive: boolean | null
    positionFinished: number | null
    achievementsEarned: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePlayerCountAggregateOutputType = {
    id: number
    gameId: number
    userId: number
    detectiveName: number
    role: number
    isReady: number
    joinTime: number
    leaveTime: number
    finalScore: number
    cardsPlayed: number
    comboStreak: number
    evidencesCollected: number
    timeBonus: number
    isActive: number
    positionFinished: number
    achievementsEarned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GamePlayerAvgAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    finalScore?: true
    cardsPlayed?: true
    comboStreak?: true
    evidencesCollected?: true
    timeBonus?: true
    positionFinished?: true
    achievementsEarned?: true
  }

  export type GamePlayerSumAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    finalScore?: true
    cardsPlayed?: true
    comboStreak?: true
    evidencesCollected?: true
    timeBonus?: true
    positionFinished?: true
    achievementsEarned?: true
  }

  export type GamePlayerMinAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    detectiveName?: true
    role?: true
    isReady?: true
    joinTime?: true
    leaveTime?: true
    finalScore?: true
    cardsPlayed?: true
    comboStreak?: true
    evidencesCollected?: true
    timeBonus?: true
    isActive?: true
    positionFinished?: true
    achievementsEarned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePlayerMaxAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    detectiveName?: true
    role?: true
    isReady?: true
    joinTime?: true
    leaveTime?: true
    finalScore?: true
    cardsPlayed?: true
    comboStreak?: true
    evidencesCollected?: true
    timeBonus?: true
    isActive?: true
    positionFinished?: true
    achievementsEarned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePlayerCountAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    detectiveName?: true
    role?: true
    isReady?: true
    joinTime?: true
    leaveTime?: true
    finalScore?: true
    cardsPlayed?: true
    comboStreak?: true
    evidencesCollected?: true
    timeBonus?: true
    isActive?: true
    positionFinished?: true
    achievementsEarned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GamePlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayer to aggregate.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GamePlayers
    **/
    _count?: true | GamePlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GamePlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GamePlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GamePlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GetGamePlayerAggregateType<T extends GamePlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateGamePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamePlayer[P]>
      : GetScalarType<T[P], AggregateGamePlayer[P]>
  }




  export type GamePlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithAggregationInput | GamePlayerOrderByWithAggregationInput[]
    by: GamePlayerScalarFieldEnum[] | GamePlayerScalarFieldEnum
    having?: GamePlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamePlayerCountAggregateInputType | true
    _avg?: GamePlayerAvgAggregateInputType
    _sum?: GamePlayerSumAggregateInputType
    _min?: GamePlayerMinAggregateInputType
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GamePlayerGroupByOutputType = {
    id: number
    gameId: number
    userId: number
    detectiveName: string
    role: $Enums.PlayerRole
    isReady: boolean
    joinTime: Date
    leaveTime: Date | null
    finalScore: number | null
    cardsPlayed: number
    comboStreak: number
    evidencesCollected: number
    timeBonus: number
    isActive: boolean
    positionFinished: number | null
    achievementsEarned: number
    createdAt: Date
    updatedAt: Date
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  type GetGamePlayerGroupByPayload<T extends GamePlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamePlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GamePlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
            : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
        }
      >
    >


  export type GamePlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    detectiveName?: boolean
    role?: boolean
    isReady?: boolean
    joinTime?: boolean
    leaveTime?: boolean
    finalScore?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    evidencesCollected?: boolean
    timeBonus?: boolean
    isActive?: boolean
    positionFinished?: boolean
    achievementsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    detectiveName?: boolean
    role?: boolean
    isReady?: boolean
    joinTime?: boolean
    leaveTime?: boolean
    finalScore?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    evidencesCollected?: boolean
    timeBonus?: boolean
    isActive?: boolean
    positionFinished?: boolean
    achievementsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    detectiveName?: boolean
    role?: boolean
    isReady?: boolean
    joinTime?: boolean
    leaveTime?: boolean
    finalScore?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    evidencesCollected?: boolean
    timeBonus?: boolean
    isActive?: boolean
    positionFinished?: boolean
    achievementsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectScalar = {
    id?: boolean
    gameId?: boolean
    userId?: boolean
    detectiveName?: boolean
    role?: boolean
    isReady?: boolean
    joinTime?: boolean
    leaveTime?: boolean
    finalScore?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    evidencesCollected?: boolean
    timeBonus?: boolean
    isActive?: boolean
    positionFinished?: boolean
    achievementsEarned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GamePlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "userId" | "detectiveName" | "role" | "isReady" | "joinTime" | "leaveTime" | "finalScore" | "cardsPlayed" | "comboStreak" | "evidencesCollected" | "timeBonus" | "isActive" | "positionFinished" | "achievementsEarned" | "createdAt" | "updatedAt", ExtArgs["result"]["gamePlayer"]>
  export type GamePlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GamePlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GamePlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GamePlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GamePlayer"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number
      userId: number
      detectiveName: string
      role: $Enums.PlayerRole
      isReady: boolean
      joinTime: Date
      leaveTime: Date | null
      finalScore: number | null
      cardsPlayed: number
      comboStreak: number
      evidencesCollected: number
      timeBonus: number
      isActive: boolean
      positionFinished: number | null
      achievementsEarned: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gamePlayer"]>
    composites: {}
  }

  type GamePlayerGetPayload<S extends boolean | null | undefined | GamePlayerDefaultArgs> = $Result.GetResult<Prisma.$GamePlayerPayload, S>

  type GamePlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GamePlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GamePlayerCountAggregateInputType | true
    }

  export interface GamePlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GamePlayer'], meta: { name: 'GamePlayer' } }
    /**
     * Find zero or one GamePlayer that matches the filter.
     * @param {GamePlayerFindUniqueArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GamePlayerFindUniqueArgs>(args: SelectSubset<T, GamePlayerFindUniqueArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GamePlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GamePlayerFindUniqueOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GamePlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, GamePlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GamePlayerFindFirstArgs>(args?: SelectSubset<T, GamePlayerFindFirstArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GamePlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, GamePlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GamePlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany()
     * 
     * // Get first 10 GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GamePlayerFindManyArgs>(args?: SelectSubset<T, GamePlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GamePlayer.
     * @param {GamePlayerCreateArgs} args - Arguments to create a GamePlayer.
     * @example
     * // Create one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.create({
     *   data: {
     *     // ... data to create a GamePlayer
     *   }
     * })
     * 
     */
    create<T extends GamePlayerCreateArgs>(args: SelectSubset<T, GamePlayerCreateArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GamePlayers.
     * @param {GamePlayerCreateManyArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GamePlayerCreateManyArgs>(args?: SelectSubset<T, GamePlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GamePlayers and returns the data saved in the database.
     * @param {GamePlayerCreateManyAndReturnArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GamePlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, GamePlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GamePlayer.
     * @param {GamePlayerDeleteArgs} args - Arguments to delete one GamePlayer.
     * @example
     * // Delete one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.delete({
     *   where: {
     *     // ... filter to delete one GamePlayer
     *   }
     * })
     * 
     */
    delete<T extends GamePlayerDeleteArgs>(args: SelectSubset<T, GamePlayerDeleteArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GamePlayer.
     * @param {GamePlayerUpdateArgs} args - Arguments to update one GamePlayer.
     * @example
     * // Update one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GamePlayerUpdateArgs>(args: SelectSubset<T, GamePlayerUpdateArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GamePlayers.
     * @param {GamePlayerDeleteManyArgs} args - Arguments to filter GamePlayers to delete.
     * @example
     * // Delete a few GamePlayers
     * const { count } = await prisma.gamePlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GamePlayerDeleteManyArgs>(args?: SelectSubset<T, GamePlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GamePlayerUpdateManyArgs>(args: SelectSubset<T, GamePlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers and returns the data updated in the database.
     * @param {GamePlayerUpdateManyAndReturnArgs} args - Arguments to update many GamePlayers.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GamePlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, GamePlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GamePlayer.
     * @param {GamePlayerUpsertArgs} args - Arguments to update or create a GamePlayer.
     * @example
     * // Update or create a GamePlayer
     * const gamePlayer = await prisma.gamePlayer.upsert({
     *   create: {
     *     // ... data to create a GamePlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamePlayer we want to update
     *   }
     * })
     */
    upsert<T extends GamePlayerUpsertArgs>(args: SelectSubset<T, GamePlayerUpsertArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerCountArgs} args - Arguments to filter GamePlayers to count.
     * @example
     * // Count the number of GamePlayers
     * const count = await prisma.gamePlayer.count({
     *   where: {
     *     // ... the filter for the GamePlayers we want to count
     *   }
     * })
    **/
    count<T extends GamePlayerCountArgs>(
      args?: Subset<T, GamePlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamePlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GamePlayerAggregateArgs>(args: Subset<T, GamePlayerAggregateArgs>): Prisma.PrismaPromise<GetGamePlayerAggregateType<T>>

    /**
     * Group by GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GamePlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamePlayerGroupByArgs['orderBy'] }
        : { orderBy?: GamePlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GamePlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGamePlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GamePlayer model
   */
  readonly fields: GamePlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamePlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamePlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GamePlayer model
   */
  interface GamePlayerFieldRefs {
    readonly id: FieldRef<"GamePlayer", 'Int'>
    readonly gameId: FieldRef<"GamePlayer", 'Int'>
    readonly userId: FieldRef<"GamePlayer", 'Int'>
    readonly detectiveName: FieldRef<"GamePlayer", 'String'>
    readonly role: FieldRef<"GamePlayer", 'PlayerRole'>
    readonly isReady: FieldRef<"GamePlayer", 'Boolean'>
    readonly joinTime: FieldRef<"GamePlayer", 'DateTime'>
    readonly leaveTime: FieldRef<"GamePlayer", 'DateTime'>
    readonly finalScore: FieldRef<"GamePlayer", 'Int'>
    readonly cardsPlayed: FieldRef<"GamePlayer", 'Int'>
    readonly comboStreak: FieldRef<"GamePlayer", 'Int'>
    readonly evidencesCollected: FieldRef<"GamePlayer", 'Int'>
    readonly timeBonus: FieldRef<"GamePlayer", 'Int'>
    readonly isActive: FieldRef<"GamePlayer", 'Boolean'>
    readonly positionFinished: FieldRef<"GamePlayer", 'Int'>
    readonly achievementsEarned: FieldRef<"GamePlayer", 'Int'>
    readonly createdAt: FieldRef<"GamePlayer", 'DateTime'>
    readonly updatedAt: FieldRef<"GamePlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GamePlayer findUnique
   */
  export type GamePlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findUniqueOrThrow
   */
  export type GamePlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findFirst
   */
  export type GamePlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findFirstOrThrow
   */
  export type GamePlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findMany
   */
  export type GamePlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayers to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer create
   */
  export type GamePlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a GamePlayer.
     */
    data: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
  }

  /**
   * GamePlayer createMany
   */
  export type GamePlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePlayer createManyAndReturn
   */
  export type GamePlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer update
   */
  export type GamePlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a GamePlayer.
     */
    data: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
    /**
     * Choose, which GamePlayer to update.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer updateMany
   */
  export type GamePlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
  }

  /**
   * GamePlayer updateManyAndReturn
   */
  export type GamePlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer upsert
   */
  export type GamePlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the GamePlayer to update in case it exists.
     */
    where: GamePlayerWhereUniqueInput
    /**
     * In case the GamePlayer found by the `where` argument doesn't exist, create a new GamePlayer with this data.
     */
    create: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
    /**
     * In case the GamePlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
  }

  /**
   * GamePlayer delete
   */
  export type GamePlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter which GamePlayer to delete.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer deleteMany
   */
  export type GamePlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayers to delete
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to delete.
     */
    limit?: number
  }

  /**
   * GamePlayer without action
   */
  export type GamePlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
  }


  /**
   * Model GameProgress
   */

  export type AggregateGameProgress = {
    _count: GameProgressCountAggregateOutputType | null
    _avg: GameProgressAvgAggregateOutputType | null
    _sum: GameProgressSumAggregateOutputType | null
    _min: GameProgressMinAggregateOutputType | null
    _max: GameProgressMaxAggregateOutputType | null
  }

  export type GameProgressAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    currentLevel: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    playerCoins: number | null
    evidencesCollected: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    timeRemainingSeconds: number | null
  }

  export type GameProgressSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    currentLevel: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    playerCoins: number | null
    evidencesCollected: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    timeRemainingSeconds: number | null
  }

  export type GameProgressMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    sessionId: string | null
    saveTimestamp: Date | null
    gameMode: $Enums.GameMode | null
    currentLevel: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    playerCoins: number | null
    evidencesCollected: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    timeRemainingSeconds: number | null
    isCurrentSave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameProgressMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    sessionId: string | null
    saveTimestamp: Date | null
    gameMode: $Enums.GameMode | null
    currentLevel: number | null
    cardsPlayed: number | null
    comboStreak: number | null
    playerCoins: number | null
    evidencesCollected: number | null
    suspectsInterrogated: number | null
    locationsInvestigated: number | null
    timeRemainingSeconds: number | null
    isCurrentSave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameProgressCountAggregateOutputType = {
    id: number
    gameId: number
    userId: number
    sessionId: number
    saveTimestamp: number
    gameMode: number
    currentLevel: number
    cardsPlayed: number
    comboStreak: number
    playerCoins: number
    evidencesCollected: number
    suspectsInterrogated: number
    locationsInvestigated: number
    timeRemainingSeconds: number
    progressDataJson: number
    isCurrentSave: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GameProgressAvgAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    currentLevel?: true
    cardsPlayed?: true
    comboStreak?: true
    playerCoins?: true
    evidencesCollected?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    timeRemainingSeconds?: true
  }

  export type GameProgressSumAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    currentLevel?: true
    cardsPlayed?: true
    comboStreak?: true
    playerCoins?: true
    evidencesCollected?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    timeRemainingSeconds?: true
  }

  export type GameProgressMinAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    sessionId?: true
    saveTimestamp?: true
    gameMode?: true
    currentLevel?: true
    cardsPlayed?: true
    comboStreak?: true
    playerCoins?: true
    evidencesCollected?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    timeRemainingSeconds?: true
    isCurrentSave?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameProgressMaxAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    sessionId?: true
    saveTimestamp?: true
    gameMode?: true
    currentLevel?: true
    cardsPlayed?: true
    comboStreak?: true
    playerCoins?: true
    evidencesCollected?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    timeRemainingSeconds?: true
    isCurrentSave?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameProgressCountAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    sessionId?: true
    saveTimestamp?: true
    gameMode?: true
    currentLevel?: true
    cardsPlayed?: true
    comboStreak?: true
    playerCoins?: true
    evidencesCollected?: true
    suspectsInterrogated?: true
    locationsInvestigated?: true
    timeRemainingSeconds?: true
    progressDataJson?: true
    isCurrentSave?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GameProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameProgress to aggregate.
     */
    where?: GameProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameProgresses to fetch.
     */
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameProgresses
    **/
    _count?: true | GameProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameProgressMaxAggregateInputType
  }

  export type GetGameProgressAggregateType<T extends GameProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateGameProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameProgress[P]>
      : GetScalarType<T[P], AggregateGameProgress[P]>
  }




  export type GameProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameProgressWhereInput
    orderBy?: GameProgressOrderByWithAggregationInput | GameProgressOrderByWithAggregationInput[]
    by: GameProgressScalarFieldEnum[] | GameProgressScalarFieldEnum
    having?: GameProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameProgressCountAggregateInputType | true
    _avg?: GameProgressAvgAggregateInputType
    _sum?: GameProgressSumAggregateInputType
    _min?: GameProgressMinAggregateInputType
    _max?: GameProgressMaxAggregateInputType
  }

  export type GameProgressGroupByOutputType = {
    id: number
    gameId: number
    userId: number
    sessionId: string | null
    saveTimestamp: Date
    gameMode: $Enums.GameMode
    currentLevel: number
    cardsPlayed: number
    comboStreak: number
    playerCoins: number
    evidencesCollected: number
    suspectsInterrogated: number
    locationsInvestigated: number
    timeRemainingSeconds: number
    progressDataJson: JsonValue | null
    isCurrentSave: boolean
    createdAt: Date
    updatedAt: Date
    _count: GameProgressCountAggregateOutputType | null
    _avg: GameProgressAvgAggregateOutputType | null
    _sum: GameProgressSumAggregateOutputType | null
    _min: GameProgressMinAggregateOutputType | null
    _max: GameProgressMaxAggregateOutputType | null
  }

  type GetGameProgressGroupByPayload<T extends GameProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameProgressGroupByOutputType[P]>
            : GetScalarType<T[P], GameProgressGroupByOutputType[P]>
        }
      >
    >


  export type GameProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    sessionId?: boolean
    saveTimestamp?: boolean
    gameMode?: boolean
    currentLevel?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    playerCoins?: boolean
    evidencesCollected?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    timeRemainingSeconds?: boolean
    progressDataJson?: boolean
    isCurrentSave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameProgress"]>

  export type GameProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    sessionId?: boolean
    saveTimestamp?: boolean
    gameMode?: boolean
    currentLevel?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    playerCoins?: boolean
    evidencesCollected?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    timeRemainingSeconds?: boolean
    progressDataJson?: boolean
    isCurrentSave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameProgress"]>

  export type GameProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    sessionId?: boolean
    saveTimestamp?: boolean
    gameMode?: boolean
    currentLevel?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    playerCoins?: boolean
    evidencesCollected?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    timeRemainingSeconds?: boolean
    progressDataJson?: boolean
    isCurrentSave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameProgress"]>

  export type GameProgressSelectScalar = {
    id?: boolean
    gameId?: boolean
    userId?: boolean
    sessionId?: boolean
    saveTimestamp?: boolean
    gameMode?: boolean
    currentLevel?: boolean
    cardsPlayed?: boolean
    comboStreak?: boolean
    playerCoins?: boolean
    evidencesCollected?: boolean
    suspectsInterrogated?: boolean
    locationsInvestigated?: boolean
    timeRemainingSeconds?: boolean
    progressDataJson?: boolean
    isCurrentSave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GameProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "userId" | "sessionId" | "saveTimestamp" | "gameMode" | "currentLevel" | "cardsPlayed" | "comboStreak" | "playerCoins" | "evidencesCollected" | "suspectsInterrogated" | "locationsInvestigated" | "timeRemainingSeconds" | "progressDataJson" | "isCurrentSave" | "createdAt" | "updatedAt", ExtArgs["result"]["gameProgress"]>
  export type GameProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GameProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameProgress"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number
      userId: number
      sessionId: string | null
      saveTimestamp: Date
      gameMode: $Enums.GameMode
      currentLevel: number
      cardsPlayed: number
      comboStreak: number
      playerCoins: number
      evidencesCollected: number
      suspectsInterrogated: number
      locationsInvestigated: number
      timeRemainingSeconds: number
      progressDataJson: Prisma.JsonValue | null
      isCurrentSave: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gameProgress"]>
    composites: {}
  }

  type GameProgressGetPayload<S extends boolean | null | undefined | GameProgressDefaultArgs> = $Result.GetResult<Prisma.$GameProgressPayload, S>

  type GameProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameProgressCountAggregateInputType | true
    }

  export interface GameProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameProgress'], meta: { name: 'GameProgress' } }
    /**
     * Find zero or one GameProgress that matches the filter.
     * @param {GameProgressFindUniqueArgs} args - Arguments to find a GameProgress
     * @example
     * // Get one GameProgress
     * const gameProgress = await prisma.gameProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameProgressFindUniqueArgs>(args: SelectSubset<T, GameProgressFindUniqueArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameProgressFindUniqueOrThrowArgs} args - Arguments to find a GameProgress
     * @example
     * // Get one GameProgress
     * const gameProgress = await prisma.gameProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, GameProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressFindFirstArgs} args - Arguments to find a GameProgress
     * @example
     * // Get one GameProgress
     * const gameProgress = await prisma.gameProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameProgressFindFirstArgs>(args?: SelectSubset<T, GameProgressFindFirstArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressFindFirstOrThrowArgs} args - Arguments to find a GameProgress
     * @example
     * // Get one GameProgress
     * const gameProgress = await prisma.gameProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, GameProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameProgresses
     * const gameProgresses = await prisma.gameProgress.findMany()
     * 
     * // Get first 10 GameProgresses
     * const gameProgresses = await prisma.gameProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameProgressWithIdOnly = await prisma.gameProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameProgressFindManyArgs>(args?: SelectSubset<T, GameProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameProgress.
     * @param {GameProgressCreateArgs} args - Arguments to create a GameProgress.
     * @example
     * // Create one GameProgress
     * const GameProgress = await prisma.gameProgress.create({
     *   data: {
     *     // ... data to create a GameProgress
     *   }
     * })
     * 
     */
    create<T extends GameProgressCreateArgs>(args: SelectSubset<T, GameProgressCreateArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameProgresses.
     * @param {GameProgressCreateManyArgs} args - Arguments to create many GameProgresses.
     * @example
     * // Create many GameProgresses
     * const gameProgress = await prisma.gameProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameProgressCreateManyArgs>(args?: SelectSubset<T, GameProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameProgresses and returns the data saved in the database.
     * @param {GameProgressCreateManyAndReturnArgs} args - Arguments to create many GameProgresses.
     * @example
     * // Create many GameProgresses
     * const gameProgress = await prisma.gameProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameProgresses and only return the `id`
     * const gameProgressWithIdOnly = await prisma.gameProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, GameProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameProgress.
     * @param {GameProgressDeleteArgs} args - Arguments to delete one GameProgress.
     * @example
     * // Delete one GameProgress
     * const GameProgress = await prisma.gameProgress.delete({
     *   where: {
     *     // ... filter to delete one GameProgress
     *   }
     * })
     * 
     */
    delete<T extends GameProgressDeleteArgs>(args: SelectSubset<T, GameProgressDeleteArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameProgress.
     * @param {GameProgressUpdateArgs} args - Arguments to update one GameProgress.
     * @example
     * // Update one GameProgress
     * const gameProgress = await prisma.gameProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameProgressUpdateArgs>(args: SelectSubset<T, GameProgressUpdateArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameProgresses.
     * @param {GameProgressDeleteManyArgs} args - Arguments to filter GameProgresses to delete.
     * @example
     * // Delete a few GameProgresses
     * const { count } = await prisma.gameProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameProgressDeleteManyArgs>(args?: SelectSubset<T, GameProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameProgresses
     * const gameProgress = await prisma.gameProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameProgressUpdateManyArgs>(args: SelectSubset<T, GameProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameProgresses and returns the data updated in the database.
     * @param {GameProgressUpdateManyAndReturnArgs} args - Arguments to update many GameProgresses.
     * @example
     * // Update many GameProgresses
     * const gameProgress = await prisma.gameProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameProgresses and only return the `id`
     * const gameProgressWithIdOnly = await prisma.gameProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, GameProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameProgress.
     * @param {GameProgressUpsertArgs} args - Arguments to update or create a GameProgress.
     * @example
     * // Update or create a GameProgress
     * const gameProgress = await prisma.gameProgress.upsert({
     *   create: {
     *     // ... data to create a GameProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameProgress we want to update
     *   }
     * })
     */
    upsert<T extends GameProgressUpsertArgs>(args: SelectSubset<T, GameProgressUpsertArgs<ExtArgs>>): Prisma__GameProgressClient<$Result.GetResult<Prisma.$GameProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressCountArgs} args - Arguments to filter GameProgresses to count.
     * @example
     * // Count the number of GameProgresses
     * const count = await prisma.gameProgress.count({
     *   where: {
     *     // ... the filter for the GameProgresses we want to count
     *   }
     * })
    **/
    count<T extends GameProgressCountArgs>(
      args?: Subset<T, GameProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameProgressAggregateArgs>(args: Subset<T, GameProgressAggregateArgs>): Prisma.PrismaPromise<GetGameProgressAggregateType<T>>

    /**
     * Group by GameProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameProgressGroupByArgs['orderBy'] }
        : { orderBy?: GameProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameProgress model
   */
  readonly fields: GameProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameProgress model
   */
  interface GameProgressFieldRefs {
    readonly id: FieldRef<"GameProgress", 'Int'>
    readonly gameId: FieldRef<"GameProgress", 'Int'>
    readonly userId: FieldRef<"GameProgress", 'Int'>
    readonly sessionId: FieldRef<"GameProgress", 'String'>
    readonly saveTimestamp: FieldRef<"GameProgress", 'DateTime'>
    readonly gameMode: FieldRef<"GameProgress", 'GameMode'>
    readonly currentLevel: FieldRef<"GameProgress", 'Int'>
    readonly cardsPlayed: FieldRef<"GameProgress", 'Int'>
    readonly comboStreak: FieldRef<"GameProgress", 'Int'>
    readonly playerCoins: FieldRef<"GameProgress", 'Int'>
    readonly evidencesCollected: FieldRef<"GameProgress", 'Int'>
    readonly suspectsInterrogated: FieldRef<"GameProgress", 'Int'>
    readonly locationsInvestigated: FieldRef<"GameProgress", 'Int'>
    readonly timeRemainingSeconds: FieldRef<"GameProgress", 'Int'>
    readonly progressDataJson: FieldRef<"GameProgress", 'Json'>
    readonly isCurrentSave: FieldRef<"GameProgress", 'Boolean'>
    readonly createdAt: FieldRef<"GameProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"GameProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameProgress findUnique
   */
  export type GameProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter, which GameProgress to fetch.
     */
    where: GameProgressWhereUniqueInput
  }

  /**
   * GameProgress findUniqueOrThrow
   */
  export type GameProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter, which GameProgress to fetch.
     */
    where: GameProgressWhereUniqueInput
  }

  /**
   * GameProgress findFirst
   */
  export type GameProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter, which GameProgress to fetch.
     */
    where?: GameProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameProgresses to fetch.
     */
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameProgresses.
     */
    cursor?: GameProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameProgresses.
     */
    distinct?: GameProgressScalarFieldEnum | GameProgressScalarFieldEnum[]
  }

  /**
   * GameProgress findFirstOrThrow
   */
  export type GameProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter, which GameProgress to fetch.
     */
    where?: GameProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameProgresses to fetch.
     */
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameProgresses.
     */
    cursor?: GameProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameProgresses.
     */
    distinct?: GameProgressScalarFieldEnum | GameProgressScalarFieldEnum[]
  }

  /**
   * GameProgress findMany
   */
  export type GameProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter, which GameProgresses to fetch.
     */
    where?: GameProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameProgresses to fetch.
     */
    orderBy?: GameProgressOrderByWithRelationInput | GameProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameProgresses.
     */
    cursor?: GameProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameProgresses.
     */
    skip?: number
    distinct?: GameProgressScalarFieldEnum | GameProgressScalarFieldEnum[]
  }

  /**
   * GameProgress create
   */
  export type GameProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a GameProgress.
     */
    data: XOR<GameProgressCreateInput, GameProgressUncheckedCreateInput>
  }

  /**
   * GameProgress createMany
   */
  export type GameProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameProgresses.
     */
    data: GameProgressCreateManyInput | GameProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameProgress createManyAndReturn
   */
  export type GameProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * The data used to create many GameProgresses.
     */
    data: GameProgressCreateManyInput | GameProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameProgress update
   */
  export type GameProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a GameProgress.
     */
    data: XOR<GameProgressUpdateInput, GameProgressUncheckedUpdateInput>
    /**
     * Choose, which GameProgress to update.
     */
    where: GameProgressWhereUniqueInput
  }

  /**
   * GameProgress updateMany
   */
  export type GameProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameProgresses.
     */
    data: XOR<GameProgressUpdateManyMutationInput, GameProgressUncheckedUpdateManyInput>
    /**
     * Filter which GameProgresses to update
     */
    where?: GameProgressWhereInput
    /**
     * Limit how many GameProgresses to update.
     */
    limit?: number
  }

  /**
   * GameProgress updateManyAndReturn
   */
  export type GameProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * The data used to update GameProgresses.
     */
    data: XOR<GameProgressUpdateManyMutationInput, GameProgressUncheckedUpdateManyInput>
    /**
     * Filter which GameProgresses to update
     */
    where?: GameProgressWhereInput
    /**
     * Limit how many GameProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameProgress upsert
   */
  export type GameProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the GameProgress to update in case it exists.
     */
    where: GameProgressWhereUniqueInput
    /**
     * In case the GameProgress found by the `where` argument doesn't exist, create a new GameProgress with this data.
     */
    create: XOR<GameProgressCreateInput, GameProgressUncheckedCreateInput>
    /**
     * In case the GameProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameProgressUpdateInput, GameProgressUncheckedUpdateInput>
  }

  /**
   * GameProgress delete
   */
  export type GameProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
    /**
     * Filter which GameProgress to delete.
     */
    where: GameProgressWhereUniqueInput
  }

  /**
   * GameProgress deleteMany
   */
  export type GameProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameProgresses to delete
     */
    where?: GameProgressWhereInput
    /**
     * Limit how many GameProgresses to delete.
     */
    limit?: number
  }

  /**
   * GameProgress without action
   */
  export type GameProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameProgress
     */
    select?: GameProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameProgress
     */
    omit?: GameProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameProgressInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    detectiveName: 'detectiveName',
    gameCode: 'gameCode',
    registrationDate: 'registrationDate',
    lastLogin: 'lastLogin',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gamesPlayed: 'gamesPlayed',
    gamesWon: 'gamesWon',
    gamesLost: 'gamesLost',
    totalScore: 'totalScore',
    cardsCollected: 'cardsCollected',
    bestTimeSeconds: 'bestTimeSeconds',
    favoriteMode: 'favoriteMode',
    comboStreakRecord: 'comboStreakRecord',
    evidencesFound: 'evidencesFound',
    suspectsInterrogated: 'suspectsInterrogated',
    locationsInvestigated: 'locationsInvestigated',
    totalPlaytimeMinutes: 'totalPlaytimeMinutes',
    lastGameDate: 'lastGameDate',
    achievementsUnlocked: 'achievementsUnlocked',
    rankLevel: 'rankLevel',
    rankPoints: 'rankPoints',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GameStatsScalarFieldEnum = (typeof GameStatsScalarFieldEnum)[keyof typeof GameStatsScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionToken: 'sessionToken',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    deviceType: 'deviceType',
    browser: 'browser',
    operatingSystem: 'operatingSystem',
    isActive: 'isActive',
    loginTime: 'loginTime',
    lastActivity: 'lastActivity',
    logoutTime: 'logoutTime',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    gameCode: 'gameCode',
    hostUserId: 'hostUserId',
    gameMode: 'gameMode',
    maxPlayers: 'maxPlayers',
    currentPlayers: 'currentPlayers',
    status: 'status',
    difficulty: 'difficulty',
    timeLimitMinutes: 'timeLimitMinutes',
    createdAt: 'createdAt',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    winnerUserId: 'winnerUserId',
    totalScore: 'totalScore',
    gameDurationMinutes: 'gameDurationMinutes',
    isActive: 'isActive',
    settingsJson: 'settingsJson',
    updatedAt: 'updatedAt'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GamePlayerScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    userId: 'userId',
    detectiveName: 'detectiveName',
    role: 'role',
    isReady: 'isReady',
    joinTime: 'joinTime',
    leaveTime: 'leaveTime',
    finalScore: 'finalScore',
    cardsPlayed: 'cardsPlayed',
    comboStreak: 'comboStreak',
    evidencesCollected: 'evidencesCollected',
    timeBonus: 'timeBonus',
    isActive: 'isActive',
    positionFinished: 'positionFinished',
    achievementsEarned: 'achievementsEarned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GamePlayerScalarFieldEnum = (typeof GamePlayerScalarFieldEnum)[keyof typeof GamePlayerScalarFieldEnum]


  export const GameProgressScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    userId: 'userId',
    sessionId: 'sessionId',
    saveTimestamp: 'saveTimestamp',
    gameMode: 'gameMode',
    currentLevel: 'currentLevel',
    cardsPlayed: 'cardsPlayed',
    comboStreak: 'comboStreak',
    playerCoins: 'playerCoins',
    evidencesCollected: 'evidencesCollected',
    suspectsInterrogated: 'suspectsInterrogated',
    locationsInvestigated: 'locationsInvestigated',
    timeRemainingSeconds: 'timeRemainingSeconds',
    progressDataJson: 'progressDataJson',
    isCurrentSave: 'isCurrentSave',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GameProgressScalarFieldEnum = (typeof GameProgressScalarFieldEnum)[keyof typeof GameProgressScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'GameMode'
   */
  export type EnumGameModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameMode'>
    


  /**
   * Reference to a field of type 'GameMode[]'
   */
  export type ListEnumGameModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameMode[]'>
    


  /**
   * Reference to a field of type 'DeviceType'
   */
  export type EnumDeviceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeviceType'>
    


  /**
   * Reference to a field of type 'DeviceType[]'
   */
  export type ListEnumDeviceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeviceType[]'>
    


  /**
   * Reference to a field of type 'GameStatus'
   */
  export type EnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus'>
    


  /**
   * Reference to a field of type 'GameStatus[]'
   */
  export type ListEnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'PlayerRole'
   */
  export type EnumPlayerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlayerRole'>
    


  /**
   * Reference to a field of type 'PlayerRole[]'
   */
  export type ListEnumPlayerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlayerRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    detectiveName?: StringFilter<"User"> | string
    gameCode?: StringNullableFilter<"User"> | string | null
    registrationDate?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    gameStats?: XOR<GameStatsNullableScalarRelationFilter, GameStatsWhereInput> | null
    sessions?: UserSessionListRelationFilter
    hostedGames?: GameListRelationFilter
    gameParticipations?: GamePlayerListRelationFilter
    gameProgress?: GameProgressListRelationFilter
    wonGames?: GameListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    detectiveName?: SortOrder
    gameCode?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameStats?: GameStatsOrderByWithRelationInput
    sessions?: UserSessionOrderByRelationAggregateInput
    hostedGames?: GameOrderByRelationAggregateInput
    gameParticipations?: GamePlayerOrderByRelationAggregateInput
    gameProgress?: GameProgressOrderByRelationAggregateInput
    wonGames?: GameOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    detectiveName?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    gameCode?: StringNullableFilter<"User"> | string | null
    registrationDate?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    gameStats?: XOR<GameStatsNullableScalarRelationFilter, GameStatsWhereInput> | null
    sessions?: UserSessionListRelationFilter
    hostedGames?: GameListRelationFilter
    gameParticipations?: GamePlayerListRelationFilter
    gameProgress?: GameProgressListRelationFilter
    wonGames?: GameListRelationFilter
  }, "id" | "email" | "detectiveName">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    detectiveName?: SortOrder
    gameCode?: SortOrderInput | SortOrder
    registrationDate?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    detectiveName?: StringWithAggregatesFilter<"User"> | string
    gameCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    registrationDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GameStatsWhereInput = {
    AND?: GameStatsWhereInput | GameStatsWhereInput[]
    OR?: GameStatsWhereInput[]
    NOT?: GameStatsWhereInput | GameStatsWhereInput[]
    id?: IntFilter<"GameStats"> | number
    userId?: IntFilter<"GameStats"> | number
    gamesPlayed?: IntFilter<"GameStats"> | number
    gamesWon?: IntFilter<"GameStats"> | number
    gamesLost?: IntFilter<"GameStats"> | number
    totalScore?: IntFilter<"GameStats"> | number
    cardsCollected?: IntFilter<"GameStats"> | number
    bestTimeSeconds?: IntFilter<"GameStats"> | number
    favoriteMode?: EnumGameModeFilter<"GameStats"> | $Enums.GameMode
    comboStreakRecord?: IntFilter<"GameStats"> | number
    evidencesFound?: IntFilter<"GameStats"> | number
    suspectsInterrogated?: IntFilter<"GameStats"> | number
    locationsInvestigated?: IntFilter<"GameStats"> | number
    totalPlaytimeMinutes?: IntFilter<"GameStats"> | number
    lastGameDate?: DateTimeNullableFilter<"GameStats"> | Date | string | null
    achievementsUnlocked?: IntFilter<"GameStats"> | number
    rankLevel?: IntFilter<"GameStats"> | number
    rankPoints?: IntFilter<"GameStats"> | number
    createdAt?: DateTimeFilter<"GameStats"> | Date | string
    updatedAt?: DateTimeFilter<"GameStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GameStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    favoriteMode?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    lastGameDate?: SortOrderInput | SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GameStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: GameStatsWhereInput | GameStatsWhereInput[]
    OR?: GameStatsWhereInput[]
    NOT?: GameStatsWhereInput | GameStatsWhereInput[]
    gamesPlayed?: IntFilter<"GameStats"> | number
    gamesWon?: IntFilter<"GameStats"> | number
    gamesLost?: IntFilter<"GameStats"> | number
    totalScore?: IntFilter<"GameStats"> | number
    cardsCollected?: IntFilter<"GameStats"> | number
    bestTimeSeconds?: IntFilter<"GameStats"> | number
    favoriteMode?: EnumGameModeFilter<"GameStats"> | $Enums.GameMode
    comboStreakRecord?: IntFilter<"GameStats"> | number
    evidencesFound?: IntFilter<"GameStats"> | number
    suspectsInterrogated?: IntFilter<"GameStats"> | number
    locationsInvestigated?: IntFilter<"GameStats"> | number
    totalPlaytimeMinutes?: IntFilter<"GameStats"> | number
    lastGameDate?: DateTimeNullableFilter<"GameStats"> | Date | string | null
    achievementsUnlocked?: IntFilter<"GameStats"> | number
    rankLevel?: IntFilter<"GameStats"> | number
    rankPoints?: IntFilter<"GameStats"> | number
    createdAt?: DateTimeFilter<"GameStats"> | Date | string
    updatedAt?: DateTimeFilter<"GameStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type GameStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    favoriteMode?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    lastGameDate?: SortOrderInput | SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GameStatsCountOrderByAggregateInput
    _avg?: GameStatsAvgOrderByAggregateInput
    _max?: GameStatsMaxOrderByAggregateInput
    _min?: GameStatsMinOrderByAggregateInput
    _sum?: GameStatsSumOrderByAggregateInput
  }

  export type GameStatsScalarWhereWithAggregatesInput = {
    AND?: GameStatsScalarWhereWithAggregatesInput | GameStatsScalarWhereWithAggregatesInput[]
    OR?: GameStatsScalarWhereWithAggregatesInput[]
    NOT?: GameStatsScalarWhereWithAggregatesInput | GameStatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameStats"> | number
    userId?: IntWithAggregatesFilter<"GameStats"> | number
    gamesPlayed?: IntWithAggregatesFilter<"GameStats"> | number
    gamesWon?: IntWithAggregatesFilter<"GameStats"> | number
    gamesLost?: IntWithAggregatesFilter<"GameStats"> | number
    totalScore?: IntWithAggregatesFilter<"GameStats"> | number
    cardsCollected?: IntWithAggregatesFilter<"GameStats"> | number
    bestTimeSeconds?: IntWithAggregatesFilter<"GameStats"> | number
    favoriteMode?: EnumGameModeWithAggregatesFilter<"GameStats"> | $Enums.GameMode
    comboStreakRecord?: IntWithAggregatesFilter<"GameStats"> | number
    evidencesFound?: IntWithAggregatesFilter<"GameStats"> | number
    suspectsInterrogated?: IntWithAggregatesFilter<"GameStats"> | number
    locationsInvestigated?: IntWithAggregatesFilter<"GameStats"> | number
    totalPlaytimeMinutes?: IntWithAggregatesFilter<"GameStats"> | number
    lastGameDate?: DateTimeNullableWithAggregatesFilter<"GameStats"> | Date | string | null
    achievementsUnlocked?: IntWithAggregatesFilter<"GameStats"> | number
    rankLevel?: IntWithAggregatesFilter<"GameStats"> | number
    rankPoints?: IntWithAggregatesFilter<"GameStats"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GameStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameStats"> | Date | string
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: IntFilter<"UserSession"> | number
    userId?: IntFilter<"UserSession"> | number
    sessionToken?: StringFilter<"UserSession"> | string
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    deviceType?: EnumDeviceTypeNullableFilter<"UserSession"> | $Enums.DeviceType | null
    browser?: StringNullableFilter<"UserSession"> | string | null
    operatingSystem?: StringNullableFilter<"UserSession"> | string | null
    isActive?: BoolFilter<"UserSession"> | boolean
    loginTime?: DateTimeFilter<"UserSession"> | Date | string
    lastActivity?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    logoutTime?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    operatingSystem?: SortOrderInput | SortOrder
    isActive?: SortOrder
    loginTime?: SortOrder
    lastActivity?: SortOrderInput | SortOrder
    logoutTime?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sessionToken?: string
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    userId?: IntFilter<"UserSession"> | number
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    deviceType?: EnumDeviceTypeNullableFilter<"UserSession"> | $Enums.DeviceType | null
    browser?: StringNullableFilter<"UserSession"> | string | null
    operatingSystem?: StringNullableFilter<"UserSession"> | string | null
    isActive?: BoolFilter<"UserSession"> | boolean
    loginTime?: DateTimeFilter<"UserSession"> | Date | string
    lastActivity?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    logoutTime?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    operatingSystem?: SortOrderInput | SortOrder
    isActive?: SortOrder
    loginTime?: SortOrder
    lastActivity?: SortOrderInput | SortOrder
    logoutTime?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _avg?: UserSessionAvgOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
    _sum?: UserSessionSumOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserSession"> | number
    userId?: IntWithAggregatesFilter<"UserSession"> | number
    sessionToken?: StringWithAggregatesFilter<"UserSession"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    deviceType?: EnumDeviceTypeNullableWithAggregatesFilter<"UserSession"> | $Enums.DeviceType | null
    browser?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    operatingSystem?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    isActive?: BoolWithAggregatesFilter<"UserSession"> | boolean
    loginTime?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    lastActivity?: DateTimeNullableWithAggregatesFilter<"UserSession"> | Date | string | null
    logoutTime?: DateTimeNullableWithAggregatesFilter<"UserSession"> | Date | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    gameCode?: StringFilter<"Game"> | string
    hostUserId?: IntFilter<"Game"> | number
    gameMode?: EnumGameModeFilter<"Game"> | $Enums.GameMode
    maxPlayers?: IntFilter<"Game"> | number
    currentPlayers?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    difficulty?: EnumDifficultyFilter<"Game"> | $Enums.Difficulty
    timeLimitMinutes?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    winnerUserId?: IntNullableFilter<"Game"> | number | null
    totalScore?: IntNullableFilter<"Game"> | number | null
    gameDurationMinutes?: IntNullableFilter<"Game"> | number | null
    isActive?: BoolFilter<"Game"> | boolean
    settingsJson?: JsonNullableFilter<"Game">
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    host?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    players?: GamePlayerListRelationFilter
    progress?: GameProgressListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    gameCode?: SortOrder
    hostUserId?: SortOrder
    gameMode?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    timeLimitMinutes?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    winnerUserId?: SortOrderInput | SortOrder
    totalScore?: SortOrderInput | SortOrder
    gameDurationMinutes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    settingsJson?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    host?: UserOrderByWithRelationInput
    winner?: UserOrderByWithRelationInput
    players?: GamePlayerOrderByRelationAggregateInput
    progress?: GameProgressOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameCode?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    hostUserId?: IntFilter<"Game"> | number
    gameMode?: EnumGameModeFilter<"Game"> | $Enums.GameMode
    maxPlayers?: IntFilter<"Game"> | number
    currentPlayers?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    difficulty?: EnumDifficultyFilter<"Game"> | $Enums.Difficulty
    timeLimitMinutes?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    winnerUserId?: IntNullableFilter<"Game"> | number | null
    totalScore?: IntNullableFilter<"Game"> | number | null
    gameDurationMinutes?: IntNullableFilter<"Game"> | number | null
    isActive?: BoolFilter<"Game"> | boolean
    settingsJson?: JsonNullableFilter<"Game">
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    host?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    players?: GamePlayerListRelationFilter
    progress?: GameProgressListRelationFilter
  }, "id" | "gameCode">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    gameCode?: SortOrder
    hostUserId?: SortOrder
    gameMode?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    timeLimitMinutes?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    winnerUserId?: SortOrderInput | SortOrder
    totalScore?: SortOrderInput | SortOrder
    gameDurationMinutes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    settingsJson?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    gameCode?: StringWithAggregatesFilter<"Game"> | string
    hostUserId?: IntWithAggregatesFilter<"Game"> | number
    gameMode?: EnumGameModeWithAggregatesFilter<"Game"> | $Enums.GameMode
    maxPlayers?: IntWithAggregatesFilter<"Game"> | number
    currentPlayers?: IntWithAggregatesFilter<"Game"> | number
    status?: EnumGameStatusWithAggregatesFilter<"Game"> | $Enums.GameStatus
    difficulty?: EnumDifficultyWithAggregatesFilter<"Game"> | $Enums.Difficulty
    timeLimitMinutes?: IntWithAggregatesFilter<"Game"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    winnerUserId?: IntNullableWithAggregatesFilter<"Game"> | number | null
    totalScore?: IntNullableWithAggregatesFilter<"Game"> | number | null
    gameDurationMinutes?: IntNullableWithAggregatesFilter<"Game"> | number | null
    isActive?: BoolWithAggregatesFilter<"Game"> | boolean
    settingsJson?: JsonNullableWithAggregatesFilter<"Game">
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
  }

  export type GamePlayerWhereInput = {
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntFilter<"GamePlayer"> | number
    detectiveName?: StringFilter<"GamePlayer"> | string
    role?: EnumPlayerRoleFilter<"GamePlayer"> | $Enums.PlayerRole
    isReady?: BoolFilter<"GamePlayer"> | boolean
    joinTime?: DateTimeFilter<"GamePlayer"> | Date | string
    leaveTime?: DateTimeNullableFilter<"GamePlayer"> | Date | string | null
    finalScore?: IntNullableFilter<"GamePlayer"> | number | null
    cardsPlayed?: IntFilter<"GamePlayer"> | number
    comboStreak?: IntFilter<"GamePlayer"> | number
    evidencesCollected?: IntFilter<"GamePlayer"> | number
    timeBonus?: IntFilter<"GamePlayer"> | number
    isActive?: BoolFilter<"GamePlayer"> | boolean
    positionFinished?: IntNullableFilter<"GamePlayer"> | number | null
    achievementsEarned?: IntFilter<"GamePlayer"> | number
    createdAt?: DateTimeFilter<"GamePlayer"> | Date | string
    updatedAt?: DateTimeFilter<"GamePlayer"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GamePlayerOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    detectiveName?: SortOrder
    role?: SortOrder
    isReady?: SortOrder
    joinTime?: SortOrder
    leaveTime?: SortOrderInput | SortOrder
    finalScore?: SortOrderInput | SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    isActive?: SortOrder
    positionFinished?: SortOrderInput | SortOrder
    achievementsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    game?: GameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GamePlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameId_userId?: GamePlayerGameIdUserIdCompoundUniqueInput
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntFilter<"GamePlayer"> | number
    detectiveName?: StringFilter<"GamePlayer"> | string
    role?: EnumPlayerRoleFilter<"GamePlayer"> | $Enums.PlayerRole
    isReady?: BoolFilter<"GamePlayer"> | boolean
    joinTime?: DateTimeFilter<"GamePlayer"> | Date | string
    leaveTime?: DateTimeNullableFilter<"GamePlayer"> | Date | string | null
    finalScore?: IntNullableFilter<"GamePlayer"> | number | null
    cardsPlayed?: IntFilter<"GamePlayer"> | number
    comboStreak?: IntFilter<"GamePlayer"> | number
    evidencesCollected?: IntFilter<"GamePlayer"> | number
    timeBonus?: IntFilter<"GamePlayer"> | number
    isActive?: BoolFilter<"GamePlayer"> | boolean
    positionFinished?: IntNullableFilter<"GamePlayer"> | number | null
    achievementsEarned?: IntFilter<"GamePlayer"> | number
    createdAt?: DateTimeFilter<"GamePlayer"> | Date | string
    updatedAt?: DateTimeFilter<"GamePlayer"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "gameId_userId">

  export type GamePlayerOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    detectiveName?: SortOrder
    role?: SortOrder
    isReady?: SortOrder
    joinTime?: SortOrder
    leaveTime?: SortOrderInput | SortOrder
    finalScore?: SortOrderInput | SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    isActive?: SortOrder
    positionFinished?: SortOrderInput | SortOrder
    achievementsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GamePlayerCountOrderByAggregateInput
    _avg?: GamePlayerAvgOrderByAggregateInput
    _max?: GamePlayerMaxOrderByAggregateInput
    _min?: GamePlayerMinOrderByAggregateInput
    _sum?: GamePlayerSumOrderByAggregateInput
  }

  export type GamePlayerScalarWhereWithAggregatesInput = {
    AND?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    OR?: GamePlayerScalarWhereWithAggregatesInput[]
    NOT?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GamePlayer"> | number
    gameId?: IntWithAggregatesFilter<"GamePlayer"> | number
    userId?: IntWithAggregatesFilter<"GamePlayer"> | number
    detectiveName?: StringWithAggregatesFilter<"GamePlayer"> | string
    role?: EnumPlayerRoleWithAggregatesFilter<"GamePlayer"> | $Enums.PlayerRole
    isReady?: BoolWithAggregatesFilter<"GamePlayer"> | boolean
    joinTime?: DateTimeWithAggregatesFilter<"GamePlayer"> | Date | string
    leaveTime?: DateTimeNullableWithAggregatesFilter<"GamePlayer"> | Date | string | null
    finalScore?: IntNullableWithAggregatesFilter<"GamePlayer"> | number | null
    cardsPlayed?: IntWithAggregatesFilter<"GamePlayer"> | number
    comboStreak?: IntWithAggregatesFilter<"GamePlayer"> | number
    evidencesCollected?: IntWithAggregatesFilter<"GamePlayer"> | number
    timeBonus?: IntWithAggregatesFilter<"GamePlayer"> | number
    isActive?: BoolWithAggregatesFilter<"GamePlayer"> | boolean
    positionFinished?: IntNullableWithAggregatesFilter<"GamePlayer"> | number | null
    achievementsEarned?: IntWithAggregatesFilter<"GamePlayer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GamePlayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GamePlayer"> | Date | string
  }

  export type GameProgressWhereInput = {
    AND?: GameProgressWhereInput | GameProgressWhereInput[]
    OR?: GameProgressWhereInput[]
    NOT?: GameProgressWhereInput | GameProgressWhereInput[]
    id?: IntFilter<"GameProgress"> | number
    gameId?: IntFilter<"GameProgress"> | number
    userId?: IntFilter<"GameProgress"> | number
    sessionId?: StringNullableFilter<"GameProgress"> | string | null
    saveTimestamp?: DateTimeFilter<"GameProgress"> | Date | string
    gameMode?: EnumGameModeFilter<"GameProgress"> | $Enums.GameMode
    currentLevel?: IntFilter<"GameProgress"> | number
    cardsPlayed?: IntFilter<"GameProgress"> | number
    comboStreak?: IntFilter<"GameProgress"> | number
    playerCoins?: IntFilter<"GameProgress"> | number
    evidencesCollected?: IntFilter<"GameProgress"> | number
    suspectsInterrogated?: IntFilter<"GameProgress"> | number
    locationsInvestigated?: IntFilter<"GameProgress"> | number
    timeRemainingSeconds?: IntFilter<"GameProgress"> | number
    progressDataJson?: JsonNullableFilter<"GameProgress">
    isCurrentSave?: BoolFilter<"GameProgress"> | boolean
    createdAt?: DateTimeFilter<"GameProgress"> | Date | string
    updatedAt?: DateTimeFilter<"GameProgress"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GameProgressOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    saveTimestamp?: SortOrder
    gameMode?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
    progressDataJson?: SortOrderInput | SortOrder
    isCurrentSave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    game?: GameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GameProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameProgressWhereInput | GameProgressWhereInput[]
    OR?: GameProgressWhereInput[]
    NOT?: GameProgressWhereInput | GameProgressWhereInput[]
    gameId?: IntFilter<"GameProgress"> | number
    userId?: IntFilter<"GameProgress"> | number
    sessionId?: StringNullableFilter<"GameProgress"> | string | null
    saveTimestamp?: DateTimeFilter<"GameProgress"> | Date | string
    gameMode?: EnumGameModeFilter<"GameProgress"> | $Enums.GameMode
    currentLevel?: IntFilter<"GameProgress"> | number
    cardsPlayed?: IntFilter<"GameProgress"> | number
    comboStreak?: IntFilter<"GameProgress"> | number
    playerCoins?: IntFilter<"GameProgress"> | number
    evidencesCollected?: IntFilter<"GameProgress"> | number
    suspectsInterrogated?: IntFilter<"GameProgress"> | number
    locationsInvestigated?: IntFilter<"GameProgress"> | number
    timeRemainingSeconds?: IntFilter<"GameProgress"> | number
    progressDataJson?: JsonNullableFilter<"GameProgress">
    isCurrentSave?: BoolFilter<"GameProgress"> | boolean
    createdAt?: DateTimeFilter<"GameProgress"> | Date | string
    updatedAt?: DateTimeFilter<"GameProgress"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GameProgressOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    saveTimestamp?: SortOrder
    gameMode?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
    progressDataJson?: SortOrderInput | SortOrder
    isCurrentSave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GameProgressCountOrderByAggregateInput
    _avg?: GameProgressAvgOrderByAggregateInput
    _max?: GameProgressMaxOrderByAggregateInput
    _min?: GameProgressMinOrderByAggregateInput
    _sum?: GameProgressSumOrderByAggregateInput
  }

  export type GameProgressScalarWhereWithAggregatesInput = {
    AND?: GameProgressScalarWhereWithAggregatesInput | GameProgressScalarWhereWithAggregatesInput[]
    OR?: GameProgressScalarWhereWithAggregatesInput[]
    NOT?: GameProgressScalarWhereWithAggregatesInput | GameProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameProgress"> | number
    gameId?: IntWithAggregatesFilter<"GameProgress"> | number
    userId?: IntWithAggregatesFilter<"GameProgress"> | number
    sessionId?: StringNullableWithAggregatesFilter<"GameProgress"> | string | null
    saveTimestamp?: DateTimeWithAggregatesFilter<"GameProgress"> | Date | string
    gameMode?: EnumGameModeWithAggregatesFilter<"GameProgress"> | $Enums.GameMode
    currentLevel?: IntWithAggregatesFilter<"GameProgress"> | number
    cardsPlayed?: IntWithAggregatesFilter<"GameProgress"> | number
    comboStreak?: IntWithAggregatesFilter<"GameProgress"> | number
    playerCoins?: IntWithAggregatesFilter<"GameProgress"> | number
    evidencesCollected?: IntWithAggregatesFilter<"GameProgress"> | number
    suspectsInterrogated?: IntWithAggregatesFilter<"GameProgress"> | number
    locationsInvestigated?: IntWithAggregatesFilter<"GameProgress"> | number
    timeRemainingSeconds?: IntWithAggregatesFilter<"GameProgress"> | number
    progressDataJson?: JsonNullableWithAggregatesFilter<"GameProgress">
    isCurrentSave?: BoolWithAggregatesFilter<"GameProgress"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"GameProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameProgress"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStatsCreateInput = {
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    totalScore?: number
    cardsCollected?: number
    bestTimeSeconds?: number
    favoriteMode?: $Enums.GameMode
    comboStreakRecord?: number
    evidencesFound?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    totalPlaytimeMinutes?: number
    lastGameDate?: Date | string | null
    achievementsUnlocked?: number
    rankLevel?: number
    rankPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGameStatsInput
  }

  export type GameStatsUncheckedCreateInput = {
    id?: number
    userId: number
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    totalScore?: number
    cardsCollected?: number
    bestTimeSeconds?: number
    favoriteMode?: $Enums.GameMode
    comboStreakRecord?: number
    evidencesFound?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    totalPlaytimeMinutes?: number
    lastGameDate?: Date | string | null
    achievementsUnlocked?: number
    rankLevel?: number
    rankPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameStatsUpdateInput = {
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGameStatsNestedInput
  }

  export type GameStatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStatsCreateManyInput = {
    id?: number
    userId: number
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    totalScore?: number
    cardsCollected?: number
    bestTimeSeconds?: number
    favoriteMode?: $Enums.GameMode
    comboStreakRecord?: number
    evidencesFound?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    totalPlaytimeMinutes?: number
    lastGameDate?: Date | string | null
    achievementsUnlocked?: number
    rankLevel?: number
    rankPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameStatsUpdateManyMutationInput = {
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateInput = {
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: number
    userId: number
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyInput = {
    id?: number
    userId: number
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    host: UserCreateNestedOneWithoutHostedGamesInput
    winner?: UserCreateNestedOneWithoutWonGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
    progress?: GameProgressCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
    progress?: GameProgressUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    winner?: UserUpdateOneWithoutWonGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
    progress?: GameProgressUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
    progress?: GameProgressUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type GameUpdateManyMutationInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerCreateInput = {
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutPlayersInput
    user: UserCreateNestedOneWithoutGameParticipationsInput
  }

  export type GamePlayerUncheckedCreateInput = {
    id?: number
    gameId: number
    userId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerUpdateInput = {
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
    user?: UserUpdateOneRequiredWithoutGameParticipationsNestedInput
  }

  export type GamePlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerCreateManyInput = {
    id?: number
    gameId: number
    userId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerUpdateManyMutationInput = {
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressCreateInput = {
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutProgressInput
    user: UserCreateNestedOneWithoutGameProgressInput
  }

  export type GameProgressUncheckedCreateInput = {
    id?: number
    gameId: number
    userId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressUpdateInput = {
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutProgressNestedInput
    user?: UserUpdateOneRequiredWithoutGameProgressNestedInput
  }

  export type GameProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressCreateManyInput = {
    id?: number
    gameId: number
    userId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressUpdateManyMutationInput = {
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type GameStatsNullableScalarRelationFilter = {
    is?: GameStatsWhereInput | null
    isNot?: GameStatsWhereInput | null
  }

  export type UserSessionListRelationFilter = {
    every?: UserSessionWhereInput
    some?: UserSessionWhereInput
    none?: UserSessionWhereInput
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type GamePlayerListRelationFilter = {
    every?: GamePlayerWhereInput
    some?: GamePlayerWhereInput
    none?: GamePlayerWhereInput
  }

  export type GameProgressListRelationFilter = {
    every?: GameProgressWhereInput
    some?: GameProgressWhereInput
    none?: GameProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GamePlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    detectiveName?: SortOrder
    gameCode?: SortOrder
    registrationDate?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    detectiveName?: SortOrder
    gameCode?: SortOrder
    registrationDate?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    detectiveName?: SortOrder
    gameCode?: SortOrder
    registrationDate?: SortOrder
    lastLogin?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumGameModeFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeFilter<$PrismaModel> | $Enums.GameMode
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GameStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    favoriteMode?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    lastGameDate?: SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameStatsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
  }

  export type GameStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    favoriteMode?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    lastGameDate?: SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    favoriteMode?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    lastGameDate?: SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameStatsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    totalScore?: SortOrder
    cardsCollected?: SortOrder
    bestTimeSeconds?: SortOrder
    comboStreakRecord?: SortOrder
    evidencesFound?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    totalPlaytimeMinutes?: SortOrder
    achievementsUnlocked?: SortOrder
    rankLevel?: SortOrder
    rankPoints?: SortOrder
  }

  export type EnumGameModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeWithAggregatesFilter<$PrismaModel> | $Enums.GameMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameModeFilter<$PrismaModel>
    _max?: NestedEnumGameModeFilter<$PrismaModel>
  }

  export type EnumDeviceTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DeviceType | EnumDeviceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDeviceTypeNullableFilter<$PrismaModel> | $Enums.DeviceType | null
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    operatingSystem?: SortOrder
    isActive?: SortOrder
    loginTime?: SortOrder
    lastActivity?: SortOrder
    logoutTime?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    operatingSystem?: SortOrder
    isActive?: SortOrder
    loginTime?: SortOrder
    lastActivity?: SortOrder
    logoutTime?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionToken?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    operatingSystem?: SortOrder
    isActive?: SortOrder
    loginTime?: SortOrder
    lastActivity?: SortOrder
    logoutTime?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSessionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumDeviceTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeviceType | EnumDeviceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDeviceTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DeviceType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDeviceTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDeviceTypeNullableFilter<$PrismaModel>
  }

  export type EnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    gameCode?: SortOrder
    hostUserId?: SortOrder
    gameMode?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    timeLimitMinutes?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    winnerUserId?: SortOrder
    totalScore?: SortOrder
    gameDurationMinutes?: SortOrder
    isActive?: SortOrder
    settingsJson?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    hostUserId?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    timeLimitMinutes?: SortOrder
    winnerUserId?: SortOrder
    totalScore?: SortOrder
    gameDurationMinutes?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    gameCode?: SortOrder
    hostUserId?: SortOrder
    gameMode?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    timeLimitMinutes?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    winnerUserId?: SortOrder
    totalScore?: SortOrder
    gameDurationMinutes?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    gameCode?: SortOrder
    hostUserId?: SortOrder
    gameMode?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    timeLimitMinutes?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    winnerUserId?: SortOrder
    totalScore?: SortOrder
    gameDurationMinutes?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    hostUserId?: SortOrder
    maxPlayers?: SortOrder
    currentPlayers?: SortOrder
    timeLimitMinutes?: SortOrder
    winnerUserId?: SortOrder
    totalScore?: SortOrder
    gameDurationMinutes?: SortOrder
  }

  export type EnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumPlayerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PlayerRole | EnumPlayerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlayerRoleFilter<$PrismaModel> | $Enums.PlayerRole
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type GamePlayerGameIdUserIdCompoundUniqueInput = {
    gameId: number
    userId: number
  }

  export type GamePlayerCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    detectiveName?: SortOrder
    role?: SortOrder
    isReady?: SortOrder
    joinTime?: SortOrder
    leaveTime?: SortOrder
    finalScore?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    isActive?: SortOrder
    positionFinished?: SortOrder
    achievementsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    finalScore?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    positionFinished?: SortOrder
    achievementsEarned?: SortOrder
  }

  export type GamePlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    detectiveName?: SortOrder
    role?: SortOrder
    isReady?: SortOrder
    joinTime?: SortOrder
    leaveTime?: SortOrder
    finalScore?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    isActive?: SortOrder
    positionFinished?: SortOrder
    achievementsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    detectiveName?: SortOrder
    role?: SortOrder
    isReady?: SortOrder
    joinTime?: SortOrder
    leaveTime?: SortOrder
    finalScore?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    isActive?: SortOrder
    positionFinished?: SortOrder
    achievementsEarned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    finalScore?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    evidencesCollected?: SortOrder
    timeBonus?: SortOrder
    positionFinished?: SortOrder
    achievementsEarned?: SortOrder
  }

  export type EnumPlayerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlayerRole | EnumPlayerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlayerRoleWithAggregatesFilter<$PrismaModel> | $Enums.PlayerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlayerRoleFilter<$PrismaModel>
    _max?: NestedEnumPlayerRoleFilter<$PrismaModel>
  }

  export type GameProgressCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    saveTimestamp?: SortOrder
    gameMode?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
    progressDataJson?: SortOrder
    isCurrentSave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
  }

  export type GameProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    saveTimestamp?: SortOrder
    gameMode?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
    isCurrentSave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameProgressMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    saveTimestamp?: SortOrder
    gameMode?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
    isCurrentSave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameProgressSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    currentLevel?: SortOrder
    cardsPlayed?: SortOrder
    comboStreak?: SortOrder
    playerCoins?: SortOrder
    evidencesCollected?: SortOrder
    suspectsInterrogated?: SortOrder
    locationsInvestigated?: SortOrder
    timeRemainingSeconds?: SortOrder
  }

  export type GameStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: GameStatsCreateOrConnectWithoutUserInput
    connect?: GameStatsWhereUniqueInput
  }

  export type UserSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutHostInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GamePlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GameProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput> | GameProgressCreateWithoutUserInput[] | GameProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutUserInput | GameProgressCreateOrConnectWithoutUserInput[]
    createMany?: GameProgressCreateManyUserInputEnvelope
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutWinnerInput = {
    create?: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput> | GameCreateWithoutWinnerInput[] | GameUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWinnerInput | GameCreateOrConnectWithoutWinnerInput[]
    createMany?: GameCreateManyWinnerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: GameStatsCreateOrConnectWithoutUserInput
    connect?: GameStatsWhereUniqueInput
  }

  export type UserSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GameProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput> | GameProgressCreateWithoutUserInput[] | GameProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutUserInput | GameProgressCreateOrConnectWithoutUserInput[]
    createMany?: GameProgressCreateManyUserInputEnvelope
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput> | GameCreateWithoutWinnerInput[] | GameUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWinnerInput | GameCreateOrConnectWithoutWinnerInput[]
    createMany?: GameCreateManyWinnerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type GameStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: GameStatsCreateOrConnectWithoutUserInput
    upsert?: GameStatsUpsertWithoutUserInput
    disconnect?: GameStatsWhereInput | boolean
    delete?: GameStatsWhereInput | boolean
    connect?: GameStatsWhereUniqueInput
    update?: XOR<XOR<GameStatsUpdateToOneWithWhereWithoutUserInput, GameStatsUpdateWithoutUserInput>, GameStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type GameUpdateManyWithoutHostNestedInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutHostInput | GameUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutHostInput | GameUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: GameUpdateManyWithWhereWithoutHostInput | GameUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GamePlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput> | GameProgressCreateWithoutUserInput[] | GameProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutUserInput | GameProgressCreateOrConnectWithoutUserInput[]
    upsert?: GameProgressUpsertWithWhereUniqueWithoutUserInput | GameProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameProgressCreateManyUserInputEnvelope
    set?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    disconnect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    delete?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    update?: GameProgressUpdateWithWhereUniqueWithoutUserInput | GameProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameProgressUpdateManyWithWhereWithoutUserInput | GameProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
  }

  export type GameUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput> | GameCreateWithoutWinnerInput[] | GameUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWinnerInput | GameCreateOrConnectWithoutWinnerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWinnerInput | GameUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: GameCreateManyWinnerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWinnerInput | GameUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWinnerInput | GameUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: GameStatsCreateOrConnectWithoutUserInput
    upsert?: GameStatsUpsertWithoutUserInput
    disconnect?: GameStatsWhereInput | boolean
    delete?: GameStatsWhereInput | boolean
    connect?: GameStatsWhereUniqueInput
    update?: XOR<XOR<GameStatsUpdateToOneWithWhereWithoutUserInput, GameStatsUpdateWithoutUserInput>, GameStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutHostInput | GameUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutHostInput | GameUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: GameUpdateManyWithWhereWithoutHostInput | GameUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput> | GameProgressCreateWithoutUserInput[] | GameProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutUserInput | GameProgressCreateOrConnectWithoutUserInput[]
    upsert?: GameProgressUpsertWithWhereUniqueWithoutUserInput | GameProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameProgressCreateManyUserInputEnvelope
    set?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    disconnect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    delete?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    update?: GameProgressUpdateWithWhereUniqueWithoutUserInput | GameProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameProgressUpdateManyWithWhereWithoutUserInput | GameProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput> | GameCreateWithoutWinnerInput[] | GameUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWinnerInput | GameCreateOrConnectWithoutWinnerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWinnerInput | GameUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: GameCreateManyWinnerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWinnerInput | GameUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWinnerInput | GameUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGameStatsInput = {
    create?: XOR<UserCreateWithoutGameStatsInput, UserUncheckedCreateWithoutGameStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameStatsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumGameModeFieldUpdateOperationsInput = {
    set?: $Enums.GameMode
  }

  export type UserUpdateOneRequiredWithoutGameStatsNestedInput = {
    create?: XOR<UserCreateWithoutGameStatsInput, UserUncheckedCreateWithoutGameStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameStatsInput
    upsert?: UserUpsertWithoutGameStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameStatsInput, UserUpdateWithoutGameStatsInput>, UserUncheckedUpdateWithoutGameStatsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumDeviceTypeFieldUpdateOperationsInput = {
    set?: $Enums.DeviceType | null
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutHostedGamesInput = {
    create?: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHostedGamesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWonGamesInput = {
    create?: XOR<UserCreateWithoutWonGamesInput, UserUncheckedCreateWithoutWonGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWonGamesInput
    connect?: UserWhereUniqueInput
  }

  export type GamePlayerCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GameProgressCreateNestedManyWithoutGameInput = {
    create?: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput> | GameProgressCreateWithoutGameInput[] | GameProgressUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutGameInput | GameProgressCreateOrConnectWithoutGameInput[]
    createMany?: GameProgressCreateManyGameInputEnvelope
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GameProgressUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput> | GameProgressCreateWithoutGameInput[] | GameProgressUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutGameInput | GameProgressCreateOrConnectWithoutGameInput[]
    createMany?: GameProgressCreateManyGameInputEnvelope
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
  }

  export type EnumGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.GameStatus
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutHostedGamesNestedInput = {
    create?: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHostedGamesInput
    upsert?: UserUpsertWithoutHostedGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHostedGamesInput, UserUpdateWithoutHostedGamesInput>, UserUncheckedUpdateWithoutHostedGamesInput>
  }

  export type UserUpdateOneWithoutWonGamesNestedInput = {
    create?: XOR<UserCreateWithoutWonGamesInput, UserUncheckedCreateWithoutWonGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWonGamesInput
    upsert?: UserUpsertWithoutWonGamesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWonGamesInput, UserUpdateWithoutWonGamesInput>, UserUncheckedUpdateWithoutWonGamesInput>
  }

  export type GamePlayerUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameProgressUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput> | GameProgressCreateWithoutGameInput[] | GameProgressUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutGameInput | GameProgressCreateOrConnectWithoutGameInput[]
    upsert?: GameProgressUpsertWithWhereUniqueWithoutGameInput | GameProgressUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameProgressCreateManyGameInputEnvelope
    set?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    disconnect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    delete?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    update?: GameProgressUpdateWithWhereUniqueWithoutGameInput | GameProgressUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameProgressUpdateManyWithWhereWithoutGameInput | GameProgressUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameProgressUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput> | GameProgressCreateWithoutGameInput[] | GameProgressUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameProgressCreateOrConnectWithoutGameInput | GameProgressCreateOrConnectWithoutGameInput[]
    upsert?: GameProgressUpsertWithWhereUniqueWithoutGameInput | GameProgressUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameProgressCreateManyGameInputEnvelope
    set?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    disconnect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    delete?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    connect?: GameProgressWhereUniqueInput | GameProgressWhereUniqueInput[]
    update?: GameProgressUpdateWithWhereUniqueWithoutGameInput | GameProgressUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameProgressUpdateManyWithWhereWithoutGameInput | GameProgressUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutPlayersInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGameParticipationsInput = {
    create?: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPlayerRoleFieldUpdateOperationsInput = {
    set?: $Enums.PlayerRole
  }

  export type GameUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    upsert?: GameUpsertWithoutPlayersInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPlayersInput, GameUpdateWithoutPlayersInput>, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneRequiredWithoutGameParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameParticipationsInput
    upsert?: UserUpsertWithoutGameParticipationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameParticipationsInput, UserUpdateWithoutGameParticipationsInput>, UserUncheckedUpdateWithoutGameParticipationsInput>
  }

  export type GameCreateNestedOneWithoutProgressInput = {
    create?: XOR<GameCreateWithoutProgressInput, GameUncheckedCreateWithoutProgressInput>
    connectOrCreate?: GameCreateOrConnectWithoutProgressInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGameProgressInput = {
    create?: XOR<UserCreateWithoutGameProgressInput, UserUncheckedCreateWithoutGameProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameProgressInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<GameCreateWithoutProgressInput, GameUncheckedCreateWithoutProgressInput>
    connectOrCreate?: GameCreateOrConnectWithoutProgressInput
    upsert?: GameUpsertWithoutProgressInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutProgressInput, GameUpdateWithoutProgressInput>, GameUncheckedUpdateWithoutProgressInput>
  }

  export type UserUpdateOneRequiredWithoutGameProgressNestedInput = {
    create?: XOR<UserCreateWithoutGameProgressInput, UserUncheckedCreateWithoutGameProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameProgressInput
    upsert?: UserUpsertWithoutGameProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameProgressInput, UserUpdateWithoutGameProgressInput>, UserUncheckedUpdateWithoutGameProgressInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumGameModeFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeFilter<$PrismaModel> | $Enums.GameMode
  }

  export type NestedEnumGameModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeWithAggregatesFilter<$PrismaModel> | $Enums.GameMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameModeFilter<$PrismaModel>
    _max?: NestedEnumGameModeFilter<$PrismaModel>
  }

  export type NestedEnumDeviceTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DeviceType | EnumDeviceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDeviceTypeNullableFilter<$PrismaModel> | $Enums.DeviceType | null
  }

  export type NestedEnumDeviceTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeviceType | EnumDeviceTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DeviceType[] | ListEnumDeviceTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDeviceTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DeviceType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDeviceTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumDeviceTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedEnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumPlayerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.PlayerRole | EnumPlayerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlayerRoleFilter<$PrismaModel> | $Enums.PlayerRole
  }

  export type NestedEnumPlayerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlayerRole | EnumPlayerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlayerRole[] | ListEnumPlayerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumPlayerRoleWithAggregatesFilter<$PrismaModel> | $Enums.PlayerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlayerRoleFilter<$PrismaModel>
    _max?: NestedEnumPlayerRoleFilter<$PrismaModel>
  }

  export type GameStatsCreateWithoutUserInput = {
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    totalScore?: number
    cardsCollected?: number
    bestTimeSeconds?: number
    favoriteMode?: $Enums.GameMode
    comboStreakRecord?: number
    evidencesFound?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    totalPlaytimeMinutes?: number
    lastGameDate?: Date | string | null
    achievementsUnlocked?: number
    rankLevel?: number
    rankPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameStatsUncheckedCreateWithoutUserInput = {
    id?: number
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    totalScore?: number
    cardsCollected?: number
    bestTimeSeconds?: number
    favoriteMode?: $Enums.GameMode
    comboStreakRecord?: number
    evidencesFound?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    totalPlaytimeMinutes?: number
    lastGameDate?: Date | string | null
    achievementsUnlocked?: number
    rankLevel?: number
    rankPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameStatsCreateOrConnectWithoutUserInput = {
    where: GameStatsWhereUniqueInput
    create: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateWithoutUserInput = {
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: number
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateManyUserInputEnvelope = {
    data: UserSessionCreateManyUserInput | UserSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutHostInput = {
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    winner?: UserCreateNestedOneWithoutWonGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
    progress?: GameProgressCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutHostInput = {
    id?: number
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
    progress?: GameProgressUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutHostInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput>
  }

  export type GameCreateManyHostInputEnvelope = {
    data: GameCreateManyHostInput | GameCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type GamePlayerCreateWithoutUserInput = {
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GamePlayerUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerCreateOrConnectWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerCreateManyUserInputEnvelope = {
    data: GamePlayerCreateManyUserInput | GamePlayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameProgressCreateWithoutUserInput = {
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    game: GameCreateNestedOneWithoutProgressInput
  }

  export type GameProgressUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressCreateOrConnectWithoutUserInput = {
    where: GameProgressWhereUniqueInput
    create: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput>
  }

  export type GameProgressCreateManyUserInputEnvelope = {
    data: GameProgressCreateManyUserInput | GameProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutWinnerInput = {
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    host: UserCreateNestedOneWithoutHostedGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
    progress?: GameProgressCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutWinnerInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
    progress?: GameProgressUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutWinnerInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput>
  }

  export type GameCreateManyWinnerInputEnvelope = {
    data: GameCreateManyWinnerInput | GameCreateManyWinnerInput[]
    skipDuplicates?: boolean
  }

  export type GameStatsUpsertWithoutUserInput = {
    update: XOR<GameStatsUpdateWithoutUserInput, GameStatsUncheckedUpdateWithoutUserInput>
    create: XOR<GameStatsCreateWithoutUserInput, GameStatsUncheckedCreateWithoutUserInput>
    where?: GameStatsWhereInput
  }

  export type GameStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: GameStatsWhereInput
    data: XOR<GameStatsUpdateWithoutUserInput, GameStatsUncheckedUpdateWithoutUserInput>
  }

  export type GameStatsUpdateWithoutUserInput = {
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStatsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    cardsCollected?: IntFieldUpdateOperationsInput | number
    bestTimeSeconds?: IntFieldUpdateOperationsInput | number
    favoriteMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    comboStreakRecord?: IntFieldUpdateOperationsInput | number
    evidencesFound?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    totalPlaytimeMinutes?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievementsUnlocked?: IntFieldUpdateOperationsInput | number
    rankLevel?: IntFieldUpdateOperationsInput | number
    rankPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutUserInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSessionScalarWhereInput = {
    AND?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    OR?: UserSessionScalarWhereInput[]
    NOT?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    id?: IntFilter<"UserSession"> | number
    userId?: IntFilter<"UserSession"> | number
    sessionToken?: StringFilter<"UserSession"> | string
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    deviceType?: EnumDeviceTypeNullableFilter<"UserSession"> | $Enums.DeviceType | null
    browser?: StringNullableFilter<"UserSession"> | string | null
    operatingSystem?: StringNullableFilter<"UserSession"> | string | null
    isActive?: BoolFilter<"UserSession"> | boolean
    loginTime?: DateTimeFilter<"UserSession"> | Date | string
    lastActivity?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    logoutTime?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
  }

  export type GameUpsertWithWhereUniqueWithoutHostInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutHostInput, GameUncheckedUpdateWithoutHostInput>
    create: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput>
  }

  export type GameUpdateWithWhereUniqueWithoutHostInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutHostInput, GameUncheckedUpdateWithoutHostInput>
  }

  export type GameUpdateManyWithWhereWithoutHostInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutHostInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: IntFilter<"Game"> | number
    gameCode?: StringFilter<"Game"> | string
    hostUserId?: IntFilter<"Game"> | number
    gameMode?: EnumGameModeFilter<"Game"> | $Enums.GameMode
    maxPlayers?: IntFilter<"Game"> | number
    currentPlayers?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    difficulty?: EnumDifficultyFilter<"Game"> | $Enums.Difficulty
    timeLimitMinutes?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    winnerUserId?: IntNullableFilter<"Game"> | number | null
    totalScore?: IntNullableFilter<"Game"> | number | null
    gameDurationMinutes?: IntNullableFilter<"Game"> | number | null
    isActive?: BoolFilter<"Game"> | boolean
    settingsJson?: JsonNullableFilter<"Game">
    updatedAt?: DateTimeFilter<"Game"> | Date | string
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutUserInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type GamePlayerScalarWhereInput = {
    AND?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    OR?: GamePlayerScalarWhereInput[]
    NOT?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntFilter<"GamePlayer"> | number
    detectiveName?: StringFilter<"GamePlayer"> | string
    role?: EnumPlayerRoleFilter<"GamePlayer"> | $Enums.PlayerRole
    isReady?: BoolFilter<"GamePlayer"> | boolean
    joinTime?: DateTimeFilter<"GamePlayer"> | Date | string
    leaveTime?: DateTimeNullableFilter<"GamePlayer"> | Date | string | null
    finalScore?: IntNullableFilter<"GamePlayer"> | number | null
    cardsPlayed?: IntFilter<"GamePlayer"> | number
    comboStreak?: IntFilter<"GamePlayer"> | number
    evidencesCollected?: IntFilter<"GamePlayer"> | number
    timeBonus?: IntFilter<"GamePlayer"> | number
    isActive?: BoolFilter<"GamePlayer"> | boolean
    positionFinished?: IntNullableFilter<"GamePlayer"> | number | null
    achievementsEarned?: IntFilter<"GamePlayer"> | number
    createdAt?: DateTimeFilter<"GamePlayer"> | Date | string
    updatedAt?: DateTimeFilter<"GamePlayer"> | Date | string
  }

  export type GameProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: GameProgressWhereUniqueInput
    update: XOR<GameProgressUpdateWithoutUserInput, GameProgressUncheckedUpdateWithoutUserInput>
    create: XOR<GameProgressCreateWithoutUserInput, GameProgressUncheckedCreateWithoutUserInput>
  }

  export type GameProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: GameProgressWhereUniqueInput
    data: XOR<GameProgressUpdateWithoutUserInput, GameProgressUncheckedUpdateWithoutUserInput>
  }

  export type GameProgressUpdateManyWithWhereWithoutUserInput = {
    where: GameProgressScalarWhereInput
    data: XOR<GameProgressUpdateManyMutationInput, GameProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type GameProgressScalarWhereInput = {
    AND?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
    OR?: GameProgressScalarWhereInput[]
    NOT?: GameProgressScalarWhereInput | GameProgressScalarWhereInput[]
    id?: IntFilter<"GameProgress"> | number
    gameId?: IntFilter<"GameProgress"> | number
    userId?: IntFilter<"GameProgress"> | number
    sessionId?: StringNullableFilter<"GameProgress"> | string | null
    saveTimestamp?: DateTimeFilter<"GameProgress"> | Date | string
    gameMode?: EnumGameModeFilter<"GameProgress"> | $Enums.GameMode
    currentLevel?: IntFilter<"GameProgress"> | number
    cardsPlayed?: IntFilter<"GameProgress"> | number
    comboStreak?: IntFilter<"GameProgress"> | number
    playerCoins?: IntFilter<"GameProgress"> | number
    evidencesCollected?: IntFilter<"GameProgress"> | number
    suspectsInterrogated?: IntFilter<"GameProgress"> | number
    locationsInvestigated?: IntFilter<"GameProgress"> | number
    timeRemainingSeconds?: IntFilter<"GameProgress"> | number
    progressDataJson?: JsonNullableFilter<"GameProgress">
    isCurrentSave?: BoolFilter<"GameProgress"> | boolean
    createdAt?: DateTimeFilter<"GameProgress"> | Date | string
    updatedAt?: DateTimeFilter<"GameProgress"> | Date | string
  }

  export type GameUpsertWithWhereUniqueWithoutWinnerInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutWinnerInput, GameUncheckedUpdateWithoutWinnerInput>
    create: XOR<GameCreateWithoutWinnerInput, GameUncheckedCreateWithoutWinnerInput>
  }

  export type GameUpdateWithWhereUniqueWithoutWinnerInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutWinnerInput, GameUncheckedUpdateWithoutWinnerInput>
  }

  export type GameUpdateManyWithWhereWithoutWinnerInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutWinnerInput>
  }

  export type UserCreateWithoutGameStatsInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutGameStatsInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutGameStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameStatsInput, UserUncheckedCreateWithoutGameStatsInput>
  }

  export type UserUpsertWithoutGameStatsInput = {
    update: XOR<UserUpdateWithoutGameStatsInput, UserUncheckedUpdateWithoutGameStatsInput>
    create: XOR<UserCreateWithoutGameStatsInput, UserUncheckedCreateWithoutGameStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameStatsInput, UserUncheckedUpdateWithoutGameStatsInput>
  }

  export type UserUpdateWithoutGameStatsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutGameStatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type UserCreateWithoutHostedGamesInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutHostedGamesInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutHostedGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
  }

  export type UserCreateWithoutWonGamesInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWonGamesInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWonGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWonGamesInput, UserUncheckedCreateWithoutWonGamesInput>
  }

  export type GamePlayerCreateWithoutGameInput = {
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGameParticipationsInput
  }

  export type GamePlayerUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerCreateOrConnectWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerCreateManyGameInputEnvelope = {
    data: GamePlayerCreateManyGameInput | GamePlayerCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GameProgressCreateWithoutGameInput = {
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGameProgressInput
  }

  export type GameProgressUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressCreateOrConnectWithoutGameInput = {
    where: GameProgressWhereUniqueInput
    create: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput>
  }

  export type GameProgressCreateManyGameInputEnvelope = {
    data: GameProgressCreateManyGameInput | GameProgressCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutHostedGamesInput = {
    update: XOR<UserUpdateWithoutHostedGamesInput, UserUncheckedUpdateWithoutHostedGamesInput>
    create: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHostedGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHostedGamesInput, UserUncheckedUpdateWithoutHostedGamesInput>
  }

  export type UserUpdateWithoutHostedGamesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutHostedGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type UserUpsertWithoutWonGamesInput = {
    update: XOR<UserUpdateWithoutWonGamesInput, UserUncheckedUpdateWithoutWonGamesInput>
    create: XOR<UserCreateWithoutWonGamesInput, UserUncheckedCreateWithoutWonGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWonGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWonGamesInput, UserUncheckedUpdateWithoutWonGamesInput>
  }

  export type UserUpdateWithoutWonGamesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWonGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutGameInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutGameInput>
  }

  export type GameProgressUpsertWithWhereUniqueWithoutGameInput = {
    where: GameProgressWhereUniqueInput
    update: XOR<GameProgressUpdateWithoutGameInput, GameProgressUncheckedUpdateWithoutGameInput>
    create: XOR<GameProgressCreateWithoutGameInput, GameProgressUncheckedCreateWithoutGameInput>
  }

  export type GameProgressUpdateWithWhereUniqueWithoutGameInput = {
    where: GameProgressWhereUniqueInput
    data: XOR<GameProgressUpdateWithoutGameInput, GameProgressUncheckedUpdateWithoutGameInput>
  }

  export type GameProgressUpdateManyWithWhereWithoutGameInput = {
    where: GameProgressScalarWhereInput
    data: XOR<GameProgressUpdateManyMutationInput, GameProgressUncheckedUpdateManyWithoutGameInput>
  }

  export type GameCreateWithoutPlayersInput = {
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    host: UserCreateNestedOneWithoutHostedGamesInput
    winner?: UserCreateNestedOneWithoutWonGamesInput
    progress?: GameProgressCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutPlayersInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    progress?: GameProgressUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutPlayersInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutGameParticipationsInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameProgress?: GameProgressCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutGameParticipationsInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameProgress?: GameProgressUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutGameParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
  }

  export type GameUpsertWithoutPlayersInput = {
    update: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPlayersInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameUpdateWithoutPlayersInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    winner?: UserUpdateOneWithoutWonGamesNestedInput
    progress?: GameProgressUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: GameProgressUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutGameParticipationsInput = {
    update: XOR<UserUpdateWithoutGameParticipationsInput, UserUncheckedUpdateWithoutGameParticipationsInput>
    create: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameParticipationsInput, UserUncheckedUpdateWithoutGameParticipationsInput>
  }

  export type UserUpdateWithoutGameParticipationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameProgress?: GameProgressUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutGameParticipationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameProgress?: GameProgressUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type GameCreateWithoutProgressInput = {
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    host: UserCreateNestedOneWithoutHostedGamesInput
    winner?: UserCreateNestedOneWithoutWonGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutProgressInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutProgressInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutProgressInput, GameUncheckedCreateWithoutProgressInput>
  }

  export type UserCreateWithoutGameProgressInput = {
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
    wonGames?: GameCreateNestedManyWithoutWinnerInput
  }

  export type UserUncheckedCreateWithoutGameProgressInput = {
    id?: number
    email: string
    passwordHash: string
    fullName: string
    detectiveName: string
    gameCode?: string | null
    registrationDate?: Date | string
    lastLogin?: Date | string | null
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    gameStats?: GameStatsUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    wonGames?: GameUncheckedCreateNestedManyWithoutWinnerInput
  }

  export type UserCreateOrConnectWithoutGameProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameProgressInput, UserUncheckedCreateWithoutGameProgressInput>
  }

  export type GameUpsertWithoutProgressInput = {
    update: XOR<GameUpdateWithoutProgressInput, GameUncheckedUpdateWithoutProgressInput>
    create: XOR<GameCreateWithoutProgressInput, GameUncheckedCreateWithoutProgressInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutProgressInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutProgressInput, GameUncheckedUpdateWithoutProgressInput>
  }

  export type GameUpdateWithoutProgressInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    winner?: UserUpdateOneWithoutWonGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutProgressInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutGameProgressInput = {
    update: XOR<UserUpdateWithoutGameProgressInput, UserUncheckedUpdateWithoutGameProgressInput>
    create: XOR<UserCreateWithoutGameProgressInput, UserUncheckedCreateWithoutGameProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameProgressInput, UserUncheckedUpdateWithoutGameProgressInput>
  }

  export type UserUpdateWithoutGameProgressInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
    wonGames?: GameUpdateManyWithoutWinnerNestedInput
  }

  export type UserUncheckedUpdateWithoutGameProgressInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    detectiveName?: StringFieldUpdateOperationsInput | string
    gameCode?: NullableStringFieldUpdateOperationsInput | string | null
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameStats?: GameStatsUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    wonGames?: GameUncheckedUpdateManyWithoutWinnerNestedInput
  }

  export type UserSessionCreateManyUserInput = {
    id?: number
    sessionToken: string
    ipAddress?: string | null
    userAgent?: string | null
    deviceType?: $Enums.DeviceType | null
    browser?: string | null
    operatingSystem?: string | null
    isActive?: boolean
    loginTime?: Date | string
    lastActivity?: Date | string | null
    logoutTime?: Date | string | null
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameCreateManyHostInput = {
    id?: number
    gameCode: string
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    winnerUserId?: number | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type GamePlayerCreateManyUserInput = {
    id?: number
    gameId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressCreateManyUserInput = {
    id?: number
    gameId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameCreateManyWinnerInput = {
    id?: number
    gameCode: string
    hostUserId: number
    gameMode: $Enums.GameMode
    maxPlayers?: number
    currentPlayers?: number
    status?: $Enums.GameStatus
    difficulty?: $Enums.Difficulty
    timeLimitMinutes?: number
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    totalScore?: number | null
    gameDurationMinutes?: number | null
    isActive?: boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type UserSessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionToken?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableEnumDeviceTypeFieldUpdateOperationsInput | $Enums.DeviceType | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    loginTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUpdateWithoutHostInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutWonGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
    progress?: GameProgressUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutHostInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
    progress?: GameProgressUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutHostInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winnerUserId?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUpdateWithoutUserInput = {
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressUpdateWithoutUserInput = {
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutProgressNestedInput
  }

  export type GameProgressUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUpdateWithoutWinnerInput = {
    gameCode?: StringFieldUpdateOperationsInput | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
    progress?: GameProgressUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutWinnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
    progress?: GameProgressUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutWinnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameCode?: StringFieldUpdateOperationsInput | string
    hostUserId?: IntFieldUpdateOperationsInput | number
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    maxPlayers?: IntFieldUpdateOperationsInput | number
    currentPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    timeLimitMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    gameDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    settingsJson?: NullableJsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerCreateManyGameInput = {
    id?: number
    userId: number
    detectiveName: string
    role?: $Enums.PlayerRole
    isReady?: boolean
    joinTime?: Date | string
    leaveTime?: Date | string | null
    finalScore?: number | null
    cardsPlayed?: number
    comboStreak?: number
    evidencesCollected?: number
    timeBonus?: number
    isActive?: boolean
    positionFinished?: number | null
    achievementsEarned?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameProgressCreateManyGameInput = {
    id?: number
    userId: number
    sessionId?: string | null
    saveTimestamp?: Date | string
    gameMode: $Enums.GameMode
    currentLevel?: number
    cardsPlayed?: number
    comboStreak?: number
    playerCoins?: number
    evidencesCollected?: number
    suspectsInterrogated?: number
    locationsInvestigated?: number
    timeRemainingSeconds: number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerUpdateWithoutGameInput = {
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGameParticipationsNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    detectiveName?: StringFieldUpdateOperationsInput | string
    role?: EnumPlayerRoleFieldUpdateOperationsInput | $Enums.PlayerRole
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinTime?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    timeBonus?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    positionFinished?: NullableIntFieldUpdateOperationsInput | number | null
    achievementsEarned?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressUpdateWithoutGameInput = {
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGameProgressNestedInput
  }

  export type GameProgressUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameProgressUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    saveTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    gameMode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    currentLevel?: IntFieldUpdateOperationsInput | number
    cardsPlayed?: IntFieldUpdateOperationsInput | number
    comboStreak?: IntFieldUpdateOperationsInput | number
    playerCoins?: IntFieldUpdateOperationsInput | number
    evidencesCollected?: IntFieldUpdateOperationsInput | number
    suspectsInterrogated?: IntFieldUpdateOperationsInput | number
    locationsInvestigated?: IntFieldUpdateOperationsInput | number
    timeRemainingSeconds?: IntFieldUpdateOperationsInput | number
    progressDataJson?: NullableJsonNullValueInput | InputJsonValue
    isCurrentSave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}