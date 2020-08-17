const Influx = require("influx");

const init = async ({ dbName, drop }) => {
  const config = {
    host: process.env.INFLUX_HOST || "localhost",
    port: process.env.INFLUX_PORT || 8086,
    username: process.env.INFLUX_USERNAME || "root",
    password: process.env.INFLUX_PASSWORD || "root",
    protocol: process.env.INFLUX_PROTOCOL || "http",
  };
  const influx = new Influx.InfluxDB({
    ...config,
    database: dbName,
    schema: [
      {
        measurement: "ad_events",
        fields: {
          ip: Influx.FieldType.STRING,
        },
        tags: ["event", "ad", "uniq"], // things with small cardinality, maybe move ad to fields
      },
    ],
  });
  const names = await influx.getDatabaseNames();
  if (!names.includes(dbName)) {
    await influx.createDatabase(dbName);
  } else if (drop) {
    await influx.dropMeasurement("ad_events", dbName);
  }
  return influx;
};
module.exports = init;
