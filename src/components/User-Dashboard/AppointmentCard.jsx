export default function AppointmentCard({
  name,
  subtitle,
  date,
  timeSlot,
  meetingLink,
  status,
  image,
}) {
  const fallbackImage =
    image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6366f1&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img
          src={fallbackImage}
          alt={name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="flex gap-12 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium text-gray-800">{date}</p>
        </div>

        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium text-gray-800">{timeSlot}</p>
        </div>
      </div>

      <div>
        <p className="text-gray-500">Meet Link</p>
        {meetingLink ? (
          <a
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-800 underline hover:text-blue-600"
          >
            Join Meeting
          </a>
        ) : (
          <p className="font-medium text-gray-800">N/A</p>
        )}
      </div>
      {/* STATUS */}
      <span
        className={`self-start md:self-center px-4 py-1 rounded-full text-sm font-medium
          ${
            status === "scheduled"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}
