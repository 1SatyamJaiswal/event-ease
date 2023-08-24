import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Owner {
  _id: string;
  participant: string;
  event: Event;
  __v: number;
}

interface Event {
  _id: string;
  name: string;
  event_date: string;
  registration_date: string;
  description: string;
  impressions: number;
  registrations: number;
  img_name: string;
  owner: Owner;
  __v: number;
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div>
      <div className="flex justify-center items-center py-8 bg-base-200">
        <div className="text-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="card w-80 bg-base-100 shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <Image
                    src={`/images/${event.img_name}`}
                    alt={event.name}
                    className="rounded-xl"
                    width={400}
                    height={300}
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title justify-center">
                    {event.name}
                  </h2>
                  <p className="line-clamp-3">{event.description}</p>
                  <p>
                    Event Date:{" "}
                    {new Date(event.event_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                  <p>
                    Deadline:{" "}
                    {new Date(event.registration_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                  <div className="card-actions justify-end">
                    <Link href={`/events/${event._id}`}>
                      <button className="btn btn-primary">Know More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
