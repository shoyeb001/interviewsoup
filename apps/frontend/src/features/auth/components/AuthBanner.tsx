export default function AuthBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-b from-[#f8e7e0] to-[#f7efec] lg:flex lg:w-1/2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[760px] w-[520px] rounded-[40px] border border-white/30 bg-white/10 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-center px-16">
        <div className="max-w-[520px]">
          <h1 className="text-[72px] font-bold leading-[82px] tracking-tight text-[#b54100]">
            Fueling Technical Excellence.
          </h1>

          <p className="mt-8 text-[24px] leading-[42px] text-zinc-700">
            Join thousands of interviewers using InterviewSoup to
            streamline their evaluation process and find the best talent
            with warm professionalism.
          </p>

          <div className="mt-16 flex gap-6">
            <div className="flex-1 rounded-2xl border border-[#e8d7cf] bg-white p-6 shadow-sm">
              <div className="mb-5 h-12 w-12 rounded-full border-2 border-[#b54100]" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                Real-time Evaluation
              </p>
            </div>

            <div className="flex-1 rounded-2xl border border-[#e8d7cf] bg-white p-6 shadow-sm">
              <div className="mb-5 h-12 w-12 rounded-full border-2 border-[#b54100]" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                Behavioral Insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}