
import { supabase } from '@/integrations/supabase/client';

export const addSampleACProducts = async () => {
  const sampleProducts = [
    {
      name: 'Samsung Digital Inverter Split AC',
      brand: 'Samsung',
      description: 'Energy-efficient Samsung inverter AC with WiFi control and fast cooling technology. Perfect for medium-sized rooms.',
      price: 135000,
      original_price: 150000,
      category: 'sale',
      condition: 'new',
      tonnage: '1.5 Ton',
      energy_rating: '5 Star',
      features: ['WiFi Control', 'Energy Efficient', 'Fast Cooling', '5 Year Warranty', 'Dual Protection'],
      images: [
        'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631545806609-e6b76ea61e5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      location: 'Islamabad, Pakistan',
      contact_info: '+92 312 5242182',
      status: 'active',
      featured: true
    },
    {
      name: 'LG Eco Inverter Window AC',
      brand: 'LG',
      description: 'Eco-friendly LG inverter AC with superior energy efficiency and dual protection system.',
      price: 115000,
      original_price: 125000,
      category: 'sale',
      condition: 'new',
      tonnage: '1 Ton',
      energy_rating: '4 Star',
      features: ['Low Power Consumption', 'Dual Protection', 'Auto Clean', 'Copper Condenser'],
      images: [
        'https://images.unsplash.com/photo-1580595999172-787970a962d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      location: 'Rawalpindi, Pakistan',
      contact_info: '+92 312 5242182',
      status: 'active',
      featured: true
    },
    {
      name: 'Haier Self Cleaning Inverter AC',
      brand: 'Haier',
      description: 'Self-cleaning Haier inverter AC with advanced filtration and smart temperature control.',
      price: 95000,
      category: 'sale',
      condition: 'new',
      tonnage: '1.5 Ton',
      energy_rating: '3 Star',
      features: ['Self Cleaning', 'Smart Control', 'Anti-Bacterial Filter', 'Turbo Cool'],
      images: [
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      location: 'Islamabad, Pakistan',
      contact_info: '+92 312 5242182',
      status: 'active',
      featured: true
    }
  ];

  try {
    const { data, error } = await supabase
      .from('ac_products')
      .insert(sampleProducts);
    
    if (error) throw error;
    console.log('✅ Sample AC products added successfully');
    return data;
  } catch (error) {
    console.error('❌ Error adding sample AC products:', error);
    throw error;
  }
};

export const addSampleServices = async () => {
  const sampleServices = [
    {
      name: 'AC Installation Service',
      slug: 'ac-installation-service',
      description: 'Professional AC installation service with expert technicians. We ensure proper installation, testing, and warranty coverage for all AC units.',
      short_description: 'Professional AC installation with warranty coverage',
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Wrench',
      category: 'installation',
      price_range: 'PKR 5,000 - 15,000',
      features: ['Expert Installation', 'Quality Testing', '1 Year Warranty', 'Same Day Service'],
      status: 'active',
      featured: true,
      sort_order: 1
    },
    {
      name: 'AC Repair & Maintenance',
      slug: 'ac-repair-maintenance',
      description: 'Complete AC repair and maintenance service. Our certified technicians can fix any AC issue and provide regular maintenance to keep your AC running efficiently.',
      short_description: 'Expert AC repair and maintenance service',
      image_url: 'https://images.unsplash.com/photo-1585738791062-5a513e6c5dd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Settings',
      category: 'repair',
      price_range: 'PKR 2,000 - 10,000',
      features: ['24/7 Emergency', 'Certified Technicians', 'Genuine Parts', 'Quick Diagnosis'],
      status: 'active',
      featured: true,
      sort_order: 2
    },
    {
      name: 'AC Gas Refilling Service',
      slug: 'ac-gas-refilling-service',
      description: 'Professional AC gas refilling service with quality refrigerant. We check for leaks, clean the system, and refill with the appropriate gas type.',
      short_description: 'Quality AC gas refilling with leak detection',
      image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'Zap',
      category: 'maintenance',
      price_range: 'PKR 3,000 - 8,000',
      features: ['Quality Refrigerant', 'Leak Detection', 'System Cleaning', 'Performance Testing'],
      status: 'active',
      featured: true,
      sort_order: 3
    }
  ];

  try {
    const { data, error } = await supabase
      .from('services')
      .insert(sampleServices);
    
    if (error) throw error;
    console.log('✅ Sample services added successfully');
    return data;
  } catch (error) {
    console.error('❌ Error adding sample services:', error);
    throw error;
  }
};

export const addSampleBlogs = async () => {
  const sampleBlogs = [
    {
      title: 'How to Choose the Right AC for Your Home',
      slug: 'how-to-choose-right-ac-for-home',
      excerpt: 'Complete guide to selecting the perfect air conditioner for your home based on room size, energy efficiency, and budget.',
      content: `<h2>Choosing the Right AC: A Comprehensive Guide</h2>
<p>Selecting the right air conditioner for your home is crucial for comfort and energy efficiency. Here's everything you need to know:</p>

<h3>1. Determine Your Room Size</h3>
<p>The size of your room is the most important factor in choosing an AC:</p>
<ul>
<li><strong>Small rooms (100-150 sq ft):</strong> 0.75 - 1 Ton AC</li>
<li><strong>Medium rooms (150-250 sq ft):</strong> 1 - 1.5 Ton AC</li>
<li><strong>Large rooms (250-400 sq ft):</strong> 1.5 - 2 Ton AC</li>
</ul>

<h3>2. Energy Efficiency</h3>
<p>Look for ACs with higher star ratings (4-5 stars) to save on electricity bills. Inverter ACs are more energy-efficient than non-inverter models.</p>

<h3>3. Budget Considerations</h3>
<p>Consider both upfront cost and long-term operating costs. A more expensive, energy-efficient AC can save money over time.</p>

<h3>4. Additional Features</h3>
<p>Modern ACs come with features like WiFi control, air purification, and self-cleaning functions.</p>

<p>Need help choosing? Contact our experts for a free consultation!</p>`,
      image_url: 'https://images.unsplash.com/photo-1631545806609-e6b76ea61e5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'AC Services Team',
      category: 'AC Tips',
      tags: ['AC Selection', 'Home Cooling', 'Energy Efficiency'],
      read_time: 7,
      status: 'active',
      featured: true
    },
    {
      title: 'AC Maintenance Tips for Summer',
      slug: 'ac-maintenance-tips-summer',
      excerpt: 'Essential AC maintenance tips to keep your air conditioner running efficiently during hot summer months.',
      content: `<h2>Essential AC Maintenance for Summer</h2>
<p>Proper maintenance ensures your AC runs efficiently when you need it most. Follow these tips:</p>

<h3>1. Clean or Replace Filters</h3>
<p>Clean filters every 2-3 weeks during heavy use. Dirty filters reduce efficiency and increase electricity consumption.</p>

<h3>2. Check Outdoor Unit</h3>
<p>Keep the outdoor unit clean and free from debris. Ensure proper airflow around the unit.</p>

<h3>3. Professional Servicing</h3>
<p>Schedule professional maintenance before summer starts. This includes gas level check, coil cleaning, and electrical connections.</p>

<h3>4. Optimal Temperature Settings</h3>
<p>Set your AC to 24-26°C for optimal efficiency and comfort.</p>

<p>Regular maintenance can extend your AC's life by 5-10 years and reduce repair costs significantly.</p>`,
      image_url: 'https://images.unsplash.com/photo-1585738791062-5a513e6c5dd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'AC Services Team',
      category: 'Maintenance',
      tags: ['AC Maintenance', 'Summer Tips', 'Energy Saving'],
      read_time: 5,
      status: 'active',
      featured: true
    },
    {
      title: 'Signs Your AC Needs Repair',
      slug: 'signs-ac-needs-repair',
      excerpt: 'Learn to identify common signs that indicate your air conditioner needs professional repair service.',
      content: `<h2>Warning Signs Your AC Needs Professional Attention</h2>
<p>Don't wait for complete breakdown. Watch for these warning signs:</p>

<h3>1. Poor Cooling Performance</h3>
<p>If your AC is running but not cooling effectively, it could indicate low refrigerant, dirty coils, or compressor issues.</p>

<h3>2. Strange Noises</h3>
<p>Unusual sounds like grinding, squealing, or rattling often indicate mechanical problems that need immediate attention.</p>

<h3>3. High Electricity Bills</h3>
<p>Sudden increase in electricity consumption without increased usage could indicate efficiency problems.</p>

<h3>4. Water Leakage</h3>
<p>Water dripping from indoor or outdoor units indicates drainage or refrigerant issues.</p>

<h3>5. Frequent On/Off Cycling</h3>
<p>If your AC turns on and off frequently, it might have thermostat or electrical issues.</p>

<p>Contact our certified technicians at the first sign of problems to avoid costly repairs!</p>`,
      image_url: 'https://images.unsplash.com/photo-1625961332071-f1673bcbcda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'AC Services Team',
      category: 'AC Repair',
      tags: ['AC Repair', 'Troubleshooting', 'AC Problems'],
      read_time: 6,
      status: 'active',
      featured: false
    }
  ];

  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert(sampleBlogs);
    
    if (error) throw error;
    console.log('✅ Sample blogs added successfully');
    return data;
  } catch (error) {
    console.error('❌ Error adding sample blogs:', error);
    throw error;
  }
};
