class T21 {
    constructor() {
        this.accumulator = 0;
        this.backup = 0;
        this.last = null;
        this.out = {
            left: null,
            right: null,
            up: null,
            down: null
        };
        this.ports = {
            left: null,
            right: null,
            up: null,
            down: null
        };
        this.currentLine = 0;
        this.instructions = [];
        this.labels = {};
        this.numInstructions = 0;
    }

    loadInstructions(instructions) {
        this.instructions = instructions.split('\n').map(function(text, i) {
            let re = /^(\w+:)?([A-Za-z0-9 ]+)?(#.*)?/;
            let matches = text.match(re);
            return {
                text: text,
                label: matches[1],
                instruction: matches[2] ? matches[2].trim().replace(/ {2,}/g, ' ') : undefined,
                comment: matches[3]
            };
        });
        this.labels = this.instructions.reduce(function(labels, line, i) {
            if (line.label) {
                labels[line.label] = i;
            }
            return labels;
        }, {});
        this.numInstructions = this.instructions.reduce(function(count, line) {
            return line.instruction ? count + 1 : count;
        }, 0);
    }

    noop() {
        return 1;
    }

    getSourceValue(source) {
        if (source == 'LAST') {
            source = this.last;
        } else if (source == 'ANY') {

        }

        if (!isNaN(source)) {
            return parseInt(source);
        } else if (source == 'NIL') {
            return 0;
        } else if (source in this.ports && this.ports[source]) {

        }
    }

    setDestination(destination, value) {
        if (destination == 'ACC') {
            this.accumulator = value;
            return 1;
        } else if (destination == 'NIL') {
            return 1;
        }
    }

    move(source, destination) {
        let value = this.getSourceValue(source);
        if (value === false) {
            return 0;
        }
        return this.setDestination(destination, value);
    }

    add(source) {
        let value = this.getSourceValue(source);
        if (value === false) {
            return 0;
        }
        this.accumulator += value;
        return 1;
    }

    subtract(source) {
        let value = this.getSourceValue(source);
        if (value === false) {
            return 0;
        }
        this.accumulator -= value;
        return 1;
    }

    save() {
        this.backup = this.accumulator;
        return 1;
    }

    swap() {
        [this.backup, this.accumulator] = [this.accumulator, this.backup];
        return 1;
    }

    negate() {
        this.accumulator = -this.accumulator;
        return 1;
    }

    step() {
        if (this.numInstructions) {
            let line = this.instructions[this.currentLine];
            while (!line.instruction) {
                this.jumpRelativeLine(1);
                line = this.instructions[this.currentLine];
            }
            let operands = line.instruction.split(' ');
            let opcode = operands.shift();
            let opFunction = this.getFunction(opcode);
            let lineChange = opFunction.apply(this, operands);
            this.jumpRelativeLine(lineChange);
        }
    }

    goToLine(lineNumber) {
        if (lineNumber >= this.instructions.length || lineNumber < 0) {
            this.currentLine = 0;
        } else {
            this.currentLine = lineNumber;
        }
        return 0;
    }

    jumpRelativeLine(lineChange) {
        return this.goToLine(this.currentLine + lineChange);
    }

    jump(label) {
        if (label in this.labels) {
            this.currentLine = this.labels[label];
        } else {
            throw "Invalid label";
        }
        return 0;
    }

    jumpIfZero(label) {
        if (this.accumulator === 0) {
            return this.jump(label);
        }
        return 1;
    }

    jumpIfNotZero(label) {
        if (this.accumulator !== 0) {
            return this.jump(label);
        }
        return 1;
    }

    jumpIfGreaterThanZero(label) {
        if (this.accumulator > 0) {
            return this.jump(label);
        }
        return 1;
    }

    jumpIfLessThanZero(label) {
        if (this.accumulator < 0) {
            return this.jump(label);
        }
        return 1;
    }

    haltCatchFire() {
        while (true) {}
    }

    getFunction(opcode) {
        opcode = opcode.toUpperCase();
        switch (opcode) {
            case 'MOV':
                return this.move;
            case 'NOP':
                return this.noop;
            case 'SWP':
                return this.swap;
            case 'SAV':
                return this.save;
            case 'ADD':
                return this.add;
            case 'SUB':
                return this.subtract;
            case 'NEG':
                return this.negate;
            case 'JMP':
                return this.jump;
            case 'JEZ':
                return this.jumpIfZero;
            case 'JNZ':
                return this.jumpIfNotZero;
            case 'JGZ':
                return this.jumpIfGreaterThanZero;
            case 'JLZ':
                return this.jumpIfLessThanZero;
            case 'JRO':
                return this.jumpRelativeLine;
            case 'HCF':
                return this.haltCatchFire;
            default:
                throw 'Invalid opcode';
        }
    }
}
