import { 
  MapPin,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer
 } from 'lucide-react'
import React from 'react'
import { getWeatherIcon, formatTemprature, formatTime } from '../utils/weatherutils'
import * as LucideIcons from "lucide-react"

function WeatherCard({weather, unit}) {

  const iconName = getWeatherIcon(weather.weather[0]); 
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
  
  const WeatherStats = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-orange-400"
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "text-green-400"
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      color: "text-cyan-400"
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      color: "text-red-400"
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemprature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-orange-400"
    }
  ]

  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8
    shadow-2xl hover:bg-white/15 transition-all duration-500'>
      {/* {Header} */}
      {console.log(weather)}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-white/20 rounded-full'>
            <MapPin className='w-10 h-10 text-white/80'/>
          </div>
          <div>
            <h2 className='text-white font-semibold text-2xl'>{weather.name}</h2>
            <p className='text-white/60 text-ls'>{weather.sys.country}</p>
          </div>
        </div>
        <div className='text-right'>
          <div className='text-white/50 text-ls'>
          {/* {Display Dynamic date} */}
          {new Date(weather.dt * 1000).toLocaleDateString("en-US",{
            weekday: "long",
            month: "short",
            day: "numeric"
          })}
          </div>
          <div className='text-white/50 text-ls'>
            {/* {Display Dynamic date} */}
            {new Date(weather.dt * 1000).toLocaleTimeString("en-US",{
            hour: "2-digit",
            minute: "2-digit",
          })}
          </div>
        </div>
      </div>

      {/* {Main weather display} */}
      <div className='flex items-center justify-between mb-10'>
        <div flex='1'>
          <div className='text-7xl font-bold text-white mb-3 tracking-tight'>
            {`${formatTemprature(weather.main.temp, unit)}°`}
            <span className='text-4xl font-normal text-white/70'>{unit}</span>
          </div>
          <div className='text-white/90 text-xl capitalize mb-2 font-medium'>
            {weather.weather[0].description}
          </div>
          <div className='flex items-center space-x-4 text-white/60 text-sm'>
          <span>H: {formatTemprature(weather.main.temp_max, unit)}°</span>
          <span>L: {formatTemprature(weather.main.temp_min, unit)}°</span>
          </div>
        </div>
        <div className='text-white/90 transform hover:scale-110 transition-transform
         duration-300'>
          {/* {Display Dynamic Icons} */}
          <IconComponent size={140} className="drop-shadow-2xl" />
        </div>
      </div>
      {/* {Weather Stats Grid} */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {/* {Map method logic} */}
        {WeatherStats.map((stat, index) => {
          return(
          <div key={index} className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10
        transition-all duration-300 group'> 
        <div className='flex items-center space-x-3 mb-2'>
          <div className={`mt-1 p-2 rounded-full bg-white/10 group-hover:bg-white/20
            transition-all`}
          >
            {/* {Dynamic icons} */}
            <stat.icon className={`w-8 h-8 ${stat.color}`}/>
          </div>
          <span className='ml-2 text-white/70 text-lg font-medium'>
            {stat.label}
          </span>
        </div>
        <div className='-mt-2 ml-6 text-white font-semibold text-2xl pl-11'>
          {stat.value}
        </div>
        </div>
          )
        })}
      </div>
      {/* {Sum Time} */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-gradient-to-r from-orange-500/20 to-yellow-500/20
        backdrop-blur-sm rounded-2xl p-4 border border-orange-400/20'>
          <div className='flex items-center space-x-3 mb-2'>
            <div className='p-2 bg-orange-400/20 rounded-full'>
              
                <Sunrise className='w-8 h-8 text-orange-400'/>
              </div>
              <span className='ml-2 text-white/80 text-lg font-medium'>Sunrise</span>
            </div>
            <div className='ml-6 text-white font-semibold text-2xl pl-11'>
              {/* {Dynamic content} */}
              {formatTime(weather.sys.sunrise)}
            </div>
          </div>

          <div className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm
          rounded-2xl p-4 border border-purple-400/20'>
            <div className='flex items-center space-x-3 mb-2'>
              <div className='p-2 bg-purple-400/20 rounded-full'>
                <Sunset className='w-8 h-8 text-purple-400'/>
              </div>
              <span className='ml-2 text-white/80 text-lg font-medium'>Sunset</span>
            </div>
            <div className='ml-6 text-white font-semibold text-2xl pl-11'>
              {/* {Dynamic content} */}
              {formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>
      </div>
  )
}

export default WeatherCard
