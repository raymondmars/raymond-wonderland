
export default interface RestrictStrategy {
  canVisit: (ipAddress: string, funName: string) => Promise<boolean>
}