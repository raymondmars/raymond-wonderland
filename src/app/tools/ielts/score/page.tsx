import Scoring from "./scoring"

export const metadata = {
  title: "IELTS writing AI examiner scoring",
  description: "Use AI to score your IELTS writing task."
}

export default function Page() {

  return (
    <div>
      <Scoring />
    </div>
  )
}
