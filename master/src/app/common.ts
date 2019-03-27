class Message {
    author: number;
    recipient: number;
    message: string;
    type: string;

    constructor(author: number, recipient: number, message: string, type: string){
        this.author = author;
        this.recipient = recipient;
        this.message = message;
        this.type = type;
    }
}


export { Message };
