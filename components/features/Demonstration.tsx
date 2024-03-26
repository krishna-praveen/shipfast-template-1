import { ButtonScheduleDemo } from "../ui/buttons"

export const Demonstration = () => {
  return (
    <section className="container flex min-h-screen flex-row items-center justify-between text-white">
      <div className="flex w-full items-start justify-between">
        <div className="text-left">
          <h1 className="mb-2 text-4xl font-bold">Marque uma <span className="text-primary-500">demonstração</span>, e veja <br />o Pump em ação!</h1>
        </div>

        <div className="rounded-lg border-4 border-primary-500 p-8">
          <div className="flex flex-col pb-10">
            <p className="text-lg text-white">Nos ajude a personalizar sua demonstração</p>
          </div>
          <form className="space-y-4">


            <ButtonScheduleDemo />
          </form>
        </div>
      </div>

    </section>
  )
}
