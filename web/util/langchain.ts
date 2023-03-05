import { HistoryItem } from "../components/ChatInterface"

const initialMessage = "你好，我是你的中文老师。你最近怎麼樣呢?"

const tutorPrompt = `
You are playing the role of a Chinese tutor AI that helps students learn Chinese. You are practicing with a student who will converse with you in Chinese. The student's Chinese may be flawed, but you will do your best to keep the conversation going. Try to end every response with a question.

`.trimStart()

const feedbackPrompt = `
Comment on the student's Chinese, addressing any mistakes or misunderstandings. Give praise where it is due.

Student's Chinese:
`.trimStart()

// TODO for testing, send the history to the tutor every time
// Eventually, keep track of sessions and only send the last message, and the tutor fetches chat history from Firebase and constructs
// prompt on the server side.

export function getInitialMessage(): string {
    return initialMessage
}

export function constructTutorPrompt(historyItems: HistoryItem[]): string {
    const history = historyItems.map(item => (item.author == "You" ? "Student" : "You") + ": " + item.message).join("\n")
    return tutorPrompt + history + "\nYou:"
}

export function constructFeedbackPrompt(studentMessage: string): string {
    return feedbackPrompt + studentMessage
}