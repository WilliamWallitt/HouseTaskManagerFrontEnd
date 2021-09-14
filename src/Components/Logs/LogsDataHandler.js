export default class LogsDataHandler {
    constructor(logs) {
        this.logs = logs
    }

    preProcess() {
        this.users = []
        this.tasks = []
        this.logs.map(log => {
            if ((!this.users.includes(log.user.userName))) {
                this.users.push(log.user.userName)
            }

            if ((!this.tasks.includes(log.task.name))) {
                this.tasks.push(log.task.name)
            }

        })
    }

    getSumOfTotalPoints() {
        this.points = this.users.map(_ => 0)
        this.taskCount = this.users.map(_ => this.tasks.map(_ => 0))
        this.logs.map(log => {
            const userIndex = this.users.indexOf(log.user.userName)
            this.points[userIndex] += log.point.point

            const taskIndex = this.tasks.indexOf(log.task.name)
            this.taskCount[userIndex][taskIndex] += 1
        })
    }

}