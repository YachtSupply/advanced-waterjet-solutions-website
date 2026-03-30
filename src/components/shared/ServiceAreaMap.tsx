interface ServiceAreaMapProps {
  address: string;
  name: string;
  className?: string;
}

export function ServiceAreaMap({ address, name, className }: ServiceAreaMapProps) {
  const encoded = encodeURIComponent(address);
  const src = `https://maps.google.com/maps?q=${encoded}&output=embed&z=12`;

  return (
    <div className={className}>
      <iframe
        title={`${name} location map`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
