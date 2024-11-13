const { Command } = require ('commander')

cosnt program = new Command


program
    .option( '-d','variable para debug', false)
    .option('-mode <mode>', 'Especificar el entorno de ejcucion de nuestro servidor', 'development')
    
program.parse()

module.exports = {
    program
}