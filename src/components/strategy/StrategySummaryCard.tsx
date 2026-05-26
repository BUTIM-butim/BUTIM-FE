type StrategySummaryCardProps = {
  title: string;
  value: string;
};

export default function StrategySummaryCard({
  title,
  value,
}: StrategySummaryCardProps) {
  return (
    <div className="flex h-[115px] w-[178px] flex-col justify-center rounded-[10px] border-[1.6px] border-text-blue bg-white px-[24px] shadow-card-blue">
      <p className="typo-popup-button text-text-black">{title}</p>
      <p className="mt-[16px] text-[30px] font-bold leading-[36px] tracking-[-0.04em] text-[#0099B8]">
        {value}
      </p>
    </div>
  );
}