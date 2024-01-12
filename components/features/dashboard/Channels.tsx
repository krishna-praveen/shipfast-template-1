import { TitleCard } from "@/components/ui/TitleCard"

interface ChannelsProps {
  title: string;
  data: Array<Record<string, any>>;
  columns: Array<string>;
}

export const Channels = ({ title, data, columns }: ChannelsProps) => {
  return (
    <TitleCard title={title}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="normal-case">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(item).map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  )
}
