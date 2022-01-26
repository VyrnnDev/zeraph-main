declare module '@vyrnn:Zeraph/Main/Environment' {
  abstract class AbstractEnvironment {
    public static getStringOrNull: (key: string) => string | undefined

    public static getString: (key: string) => string

    public static getIntOrNull: (key: string) => number

    public static getInt: (key: string) => number | undefined
  }
}
