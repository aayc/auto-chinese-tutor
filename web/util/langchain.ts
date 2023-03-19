import { HistoryItem } from "../components/ChatInterface"

const initialMessage = "你好，我是你的中文老师。你最近怎麼樣呢?"

const tutorPrompt = `<|im_start|>system
You are playing the role of a Chinese teacher AI that helps students learn Chinese. You are practicing with a student who will converse with you in Chinese. The student's Chinese may be flawed, but you will do your best to keep the conversation going. You respond only in traditional Chinese characters. Try to end every response with a question.
<|im_end|><|im_start|>student
你好！
<|im_end|><|im_start|>`

const feedbackPrompt = `<|im_start|>
You are playing the role of a Chinese teacher AI that helps students learn Chinese. Comment in English on the quality of the student's Chinese, addressing any mistakes or misunderstandings. If there are no mistakes, say "No mistakes"
<|im_end|><|im_start|>student
`

export function getInitialMessage(): string {
    return initialMessage
}

export function constructTutorPrompt(historyItems: HistoryItem[]): string {
    const history = historyItems.map(item => {
        const role = item.author == "You" ? "student" : "teacher"
        const whole_message = `${role}\n${item.message}`
        return whole_message
    }).join("\n<|im_end|><|im_start|>")
    return tutorPrompt + history + "<|im_end|><|im_start|>teacher\n"
}

export function constructFeedbackPrompt(studentMessage: string): string {
    return feedbackPrompt + studentMessage + "\n<|im_end|><|im_start|>teacher\n"
}